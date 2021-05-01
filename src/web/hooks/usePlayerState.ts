import * as React from "react"
import PlayerState from "../../common/models/playerState";
import { getPlayerState } from "../api/music"

export default function usePlayerState(): PlayerState | null {
  const [playerState, setPlayerState] = React.useState<PlayerState | null>(null)
  const interval = 500

  React.useEffect(() => {
    let killed = false

    async function poll() {
      if (killed) return
      await getPlayerState().then(setPlayerState)
      setTimeout(poll, interval)
    }

    poll()

    return () => { killed = true }
  }, [])

  return playerState
}
