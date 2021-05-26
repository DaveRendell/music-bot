import * as React from "react"
import PlayerState from "../../../common/models/playerState"
import { playPause, skip, stop } from "../../api/music"
import AmbienceSwitcher from "../AmbienceSwitcher"
import PlayerButton from "../PlayerButton"
import { SongProgressBar } from "./SongProgressBar"

type ConnectedPlayerControlProps = {
  playerState: PlayerState
}

export default function ConnectedPlayerControl({ playerState }: ConnectedPlayerControlProps) {
  const song = playerState.playlist[playerState.nowPlayingIndex]

  return (
    <div>
      <PlayerButton action={playPause} iconClass={playerState.isPaused ? "play" : "pause"} />
      <PlayerButton action={skip} iconClass="forward" />
      <PlayerButton action={stop} iconClass="stop" />
      <SongProgressBar
        songName={song?.name || ""}
        isPaused={playerState.isPaused}
        playTime={playerState.streamTime}
        totalTime={song?.length || 0}      
      />
      <AmbienceSwitcher ambienceId={playerState.ambienceId} />
    </div>
  )
}
