import * as React from "react"
import PlayerState from "../../common/models/playerState"
import { playPause, skip, stop } from "../api/music"

type PlayerControlProps = {
  playerState: PlayerState
}

function minutesAndSeconds(length: number): { minutes: string, seconds: string } {
  return {
    minutes: Math.floor(length / 60).toLocaleString(),
    seconds: (length % 60).toLocaleString("en-GB", { minimumIntegerDigits: 2, useGrouping: false })
  }
}

export default function PlayerControl({ playerState }: PlayerControlProps) {
  if (!playerState) {
    return <></>
  }

  const song = playerState.playlist[playerState.nowPlayingIndex]

  const streamTime = minutesAndSeconds(Math.floor(playerState.streamTime / 1000))
  const songTime = minutesAndSeconds(song?.length || 0)


  return (
    <div>
      <button onClick={() => playPause()}>Play / Pause</button>
      <button onClick={() => skip()}>Skip</button>
      <button onClick={() => stop()}>Stop</button>
      <p>{song?.name} - {streamTime.minutes}:{streamTime.seconds} / {songTime.minutes}:{songTime.seconds}</p>
    </div>
  )
}