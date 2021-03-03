import * as express from "express"
import songRoutes from "./routes/songRoutes"
import * as bodyParser from "body-parser"
import * as cors from "cors"

const api = express()
const port = 3000
const Discord = require('discord.js')
const client = new Discord.Client()
const { token } = require('../../token.json')


api.use(bodyParser.json())
api.use(cors())

api.get("/sendTestMessage", (req, res) => {
  const channel = client.channels.cache.get('676831672230084608')
  channel.send("Test message pls ignore")
  console.log("Button pressed")
  
  // Return empty response
  res.status(204).send()
})

api.use("/songs", songRoutes)

client.once('ready', () => {
	api.listen(port, () => {
    console.log(`API & Discord running on port ${port}`)
  })
})

client.login(token)
