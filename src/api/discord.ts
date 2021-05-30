const ytdl = require("ytdl-core-discord")
const { musicBotToken, ambienceBotToken } = require('../../token.json')
import * as Discord from "discord.js"
import NotConnectedError from "./errors/notConnectedError"
import { broadcastPlayerState, onSongFinish } from "./musicService"

let musicConnection: Discord.VoiceConnection | null = null
let ambienceConnection: Discord.VoiceConnection | null = null

export function startUp(callback: () => void): void {
  const musicClient = new Discord.Client()
  const ambienceClient = new Discord.Client()
  musicClient.once('ready', callback)
  
  musicClient.on('message', async (message: Discord.Message) => {
    const messageIsForAllUsers = message.content.includes("@here")
        || message.content.includes("@everyone")
    if (musicClient.user && message.mentions.has(musicClient.user) && !messageIsForAllUsers) {
      if (message.member?.voice.channel) {
        const channelId = message.member?.voice.channel.id;
        [musicConnection, ambienceConnection] = await Promise.all([
          message.member.voice.channel.join(),
          (ambienceClient.channels.cache.get(channelId) as Discord.VoiceChannel).join()
        ]);
        message.reply(`Connected to ${message.member.voice.channel.name}.`)
        setTimeout(broadcastPlayerState, 250)
      } else {
        message.reply('You need to join a voice channel first!');
      }
    }
  });
  
  musicClient.login(musicBotToken)
  ambienceClient.login(ambienceBotToken)
}

export function playSong(youtubeUrl: string): Promise<Discord.StreamDispatcher> {
  return playAudio(musicConnection, youtubeUrl, onSongFinish)
}

export function setAmbience(youtubeUrl: string): Promise<Discord.StreamDispatcher> {
  return playAudio(ambienceConnection, youtubeUrl, () => setAmbience(youtubeUrl))
}

async function playAudio(
  connection: Discord.VoiceConnection | null,
  youtubeUrl: string,
  onFinish: () => Promise<any>
): Promise<Discord.StreamDispatcher> {
  if (connection === null) {
    throw new NotConnectedError()
  }

  let stream;
  try {
    stream = await ytdl(youtubeUrl)
  } catch (e) {
    console.error(`Error playing song at URL ${youtubeUrl}\n`, e)
    return onFinish()
  }

  let dispatcher = connection.play(stream, { type: 'opus' })

  dispatcher.on('finish', () => {
    onFinish()
  })

  return dispatcher
}

export function isConnected(): boolean {
  return !!musicConnection
}

export async function stopAmbience(): Promise<void> {
  return ambienceConnection?.dispatcher.destroy()
} 

export function disconnect(): void {
  musicConnection?.disconnect()
  ambienceConnection?.disconnect()
  musicConnection = null
  ambienceConnection = null
}
