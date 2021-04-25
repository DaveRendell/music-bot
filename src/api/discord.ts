const ytdl = require("ytdl-core-discord")
const { token } = require('../../token.json')
import * as Discord from "discord.js"

let connection: Discord.VoiceConnection | null = null

export function startUp(callback: () => void): void {
  const client = new Discord.Client()
  client.once('ready', callback)
  
  client.on('message', async (message: Discord.Message) => {
    if (client.user && message.mentions.has(client.user)) {
      if (message.member?.voice.channel) {
        connection = await message.member.voice.channel.join();
      } else {
        message.reply('You need to join a voice channel first!');
      }
    }
  });
  
  client.login(token)
}

export async function playSong(youtubeUrl: string): Promise<void> {
  if (connection === null) {
    throw new Error("Not currently connected to a voice channel")
  }
  connection.play(await ytdl(youtubeUrl), { type: 'opus' });
  return
}