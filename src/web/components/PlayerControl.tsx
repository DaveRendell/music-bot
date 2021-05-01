import * as React from "react"
import PlayerState from "../../common/models/playerState"
import { playPause, skip, stop } from "../api/music"

type PlayerControlProps = {
  playerState: PlayerState
}

export default function PlayerControl({ playerState }: PlayerControlProps) {
  if (!playerState) {
    return <p>Loading...</p>
  }
  const streamTimeSeconds = Math.floor(playerState.streamTime / 1000)
  const song = playerState.playlist[playerState.nowPlayingIndex]
  return (
    <div>
      <button onClick={() => playPause()}>Play / Pause</button>
      <button onClick={() => skip()}>Skip</button>
      <button onClick={() => stop()}>Stop</button>
      <p>{song?.name} - {streamTimeSeconds} / ?:??</p>
    </div>
  )
}