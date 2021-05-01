const ytdl = require("ytdl-core-discord")
const { token } = require('../../token.json')
import * as Discord from "discord.js"
import { onSongFinish } from "./musicService"

let connection: Discord.VoiceConnection | null = null

export function startUp(callback: () => void): void {
  const client = new Discord.Client()
  client.once('ready', callback)
  
  client.on('message', async (message: Discord.Message) => {
    const messageIsForAllUsers = message.content.includes("@here")
        || message.content.includes("@everyone")
    if (client.user && message.mentions.has(client.user) && !messageIsForAllUsers) {
      if (message.member?.voice.channel) {
        connection = await message.member.voice.channel.join();
      } else {
        message.reply('You need to join a voice channel first!');
      }
    }
  });
  
  client.login(token)
}

export async function playSong(youtubeUrl: string): Promise<Discord.StreamDispatcher> {
  if (connection === null) {
    throw new Error("Not currently connected to a voice channel")
  }

  let dispatcher = connection.play(await ytdl(youtubeUrl), { type: 'opus' })

  dispatcher.on('finish', () => {
    console.log(`Finished playing song at ${youtubeUrl}`)
    onSongFinish()
  })

  return dispatcher
}
