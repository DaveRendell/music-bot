import * as React from "react"
import { Link } from "react-router-dom"
import Playlist from "../../common/models/playlist"
import { shuffle } from "../api/music"
import PlayerButton from "./PlayerButton"

type PlaylistListItemProps = {
  playlist: Playlist
}

export default function PlaylistListItem({
  playlist
}: PlaylistListItemProps) {
  const numberOfSongs = playlist.songIds.length
  const playlistLengthText = `${numberOfSongs} song${numberOfSongs == 1 ? "" : "s"}`
  return (
    <div>
      <PlayerButton action={() => shuffle(playlist.id)} iconClass="random" />
      <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
      <span> - {playlistLengthText}</span>
    </div>
  )
}