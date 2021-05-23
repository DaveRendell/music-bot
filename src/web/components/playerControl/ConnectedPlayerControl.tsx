import * as React from "react"
import PlayerState from "../../../common/models/playerState"
import playerState from "../../../common/models/playerState"
import song from "../../../common/models/song"
import { playPause, skip } from "../../api/music"
import AmbienceSwitcher from "../AmbienceSwitcher"
import PlayerButton from "../PlayerButton"

type ConnectedPlayerControlProps = {
  playerState: PlayerState
}

function minutesAndSeconds(length: number): { minutes: string, seconds: string } {
  return {
    minutes: Math.floor(length / 60).toLocaleString(),
    seconds: (length % 60).toLocaleString("en-GB", { minimumIntegerDigits: 2, useGrouping: false })
  }
}

export default function ConnectedPlayerControl({ playerState }: ConnectedPlayerControlProps) {
  const song = playerState.playlist[playerState.nowPlayingIndex]

  const streamTime = minutesAndSeconds(Math.floor(playerState.streamTime / 1000))
  const songTime = minutesAndSeconds(song?.length || 0)
  
  return (
    <div>
      <PlayerButton action={playPause} iconClass={playerState.isPaused ? "play" : "pause"} />
      <PlayerButton action={skip} iconClass="forward" />
      <PlayerButton action={stop} iconClass="stop" />
      <span>{song?.name} - {streamTime.minutes}:{streamTime.seconds} / {songTime.minutes}:{songTime.seconds}</span>
      <AmbienceSwitcher ambienceId={playerState.ambienceId} />
    </div>
  )
}
