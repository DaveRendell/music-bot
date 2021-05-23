import * as React from "react"
import PlayerState from "../../common/models/playerState";

export default function usePlayerState(): PlayerState | null {
  const [playerState, setPlayerState] = React.useState<PlayerState | null>(null)

  React.useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000')

    ws.onmessage = (event: MessageEvent<string>) => {
      console.info("received message", event)
      setPlayerState(JSON.parse(event.data))
    }

    return () => ws.close()
  }, [])  

  return playerState
}
