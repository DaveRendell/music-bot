const ytdl = require("ytdl-core-discord")
const { token } = require('../../token.json')
import * as Discord from "discord.js"
import { onSongFinish } from "./musicService"
import * as Ngrok from "ngrok"

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
        const port = process.env.NODE_ENV == "production" ? 3000 : 1234
        const url = await Ngrok.connect(port)
        message.reply(`Connected to ${message.member.voice.channel.name}. You can access my web interface at ${url}.`)
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

export function disconnect(): void {
  connection?.disconnect()
}
