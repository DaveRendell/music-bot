const ytdl = require("ytdl-core-discord")
const { musicBotToken, ambienceBotToken } = require('../../token.json')
import * as Discord from "discord.js"
import { onSongFinish } from "./musicService"

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
      } else {
        message.reply('You need to join a voice channel first!');
      }
    }
  });
  
  musicClient.login(musicBotToken)
  ambienceClient.login(ambienceBotToken)
}

export async function playSong(youtubeUrl: string): Promise<Discord.StreamDispatcher> {
  if (musicConnection === null) {
    throw new Error("Not currently connected to a voice channel")
  }

  let dispatcher = musicConnection.play(await ytdl(youtubeUrl), { type: 'opus' })

  dispatcher.on('finish', () => {
    console.log(`Finished playing song at ${youtubeUrl}`)
    onSongFinish()
  })

  return dispatcher
}

export async function setAmbience(youtubeUrl: string): Promise<Discord.StreamDispatcher> {
  if (ambienceConnection === null) {
    throw new Error("Not currently connected to a voice channel")
  }

  let dispatcher = ambienceConnection.play(await ytdl(youtubeUrl), { type: 'opus' })

  dispatcher.on('finish', () => {
    setAmbience(youtubeUrl)
  })

  return dispatcher
}

export function disconnect(): void {
  musicConnection?.disconnect()
  ambienceConnection?.disconnect()
}
