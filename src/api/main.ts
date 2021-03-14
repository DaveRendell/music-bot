import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from "cors"
import * as path from "path"
import { RegisterRoutes } from "./build/routes"
import { ValidateError } from "tsoa"

const api = express()
const port = 3000
const Discord = require('discord.js')
const client = new Discord.Client()
const { token } = require('../../token.json')


api.use(bodyParser.json())
api.use(cors())

api.get("/sendTestMessage", (_req: express.Request, res: express.Response) => {
  const channel = client.channels.cache.get('676831672230084608')
  channel.send("Test message pls ignore")
  console.log("Button pressed")
  
  // Return empty response
  res.status(204).send()
})

RegisterRoutes(api)

api.use(function errorHandler(
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

if (process.env.NODE_ENV === "production") {
  console.log("in prod")
  api.get(/.*js/, express.static(path.join(__dirname, '../web')));
  api.get('*', function(_req, res) {
    res.sendFile(path.join(__dirname, "../web/index.html"));
  });
}

client.once('ready', () => {
	api.listen(port, () => {
    console.log(`API & Discord running on port ${port}`)
  })
})

client.login(token)
