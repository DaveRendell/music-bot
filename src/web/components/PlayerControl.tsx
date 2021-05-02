import * as React from "react"
import PlayerState from "../../common/models/playerState"
import { playPause, skip, stop } from "../api/music"
import "../styles/light.scss"
import "../styles/sticky-bottom.scss"
import "../styles/components/player-control.scss"
import PlayerButton from "./PlayerButton"

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
  console.log(playerState)

  return (
    <div className="player-control | light sticky-bottom">
      <PlayerButton action={playPause} iconClass={playerState.isPaused ? "play" : "pause"} />
      <PlayerButton action={skip} iconClass="forward" />
      <PlayerButton action={stop} iconClass="stop" />
      <span>{song?.name} - {streamTime.minutes}:{streamTime.seconds} / {songTime.minutes}:{songTime.seconds}</span>
    </div>
  )
}