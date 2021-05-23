import * as http from "http"
import * as WebSocket from "ws"
import { getPlayerState } from "./musicService"

let wss: WebSocket.Server | null = null

export function setUpWebsocket(server: http.Server): void {
  wss = new WebSocket.Server({ server })

  wss.on('connection', (ws: WebSocket) => {
    getPlayerState()
      .then(JSON.stringify)
      .then(broadcastMessage)
    console.log("Websocket connected")
  })
}

export function broadcastMessage(message: string) {
  wss?.clients.forEach(client => client.send(message))
}
