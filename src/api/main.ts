import * as express from "express"

const api = express()
const port = 3000
const Discord = require('discord.js')
const client = new Discord.Client()
const { token } = require('../../token.json')


api.get("/sendTestMessage", (req, res) => {
  const channel = client.channels.cache.get('676831672230084608')
  channel.send("Test message pls ignore")
  console.log("Button pressed")
  
  // Return empty response
  res.status(204).send()
})

client.once('ready', () => {
	api.listen(port, () => {
    console.log(`API & Discord running on port ${port}`)
  })
})

client.login(token)
