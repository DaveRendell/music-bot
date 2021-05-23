import * as React from "react"
import PlayerState from "../../../common/models/playerState"
import "../../styles/light.scss"
import "../../styles/sticky-bottom.scss"
import "../../styles/components/player-control.scss"
import ConnectedPlayerControl from "./ConnectedPlayerControl"
import DisconnectedPlayerControl from "./DisconnectedPlayerControl"

type PlayerControlProps = {
  playerState: PlayerState
}

export default function PlayerControl({ playerState }: PlayerControlProps) {
  if (!playerState) {
    return <></>
  }

  return (
    <div className="player-control | light sticky-bottom">
      {playerState.isConnected
        ? <ConnectedPlayerControl playerState={playerState} />
        : <DisconnectedPlayerControl />}
    </div>
  )
}
