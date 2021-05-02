import * as React from "react"
import Song from "../../common/models/song"
import { Link } from "react-router-dom"
import { playSong } from "../api/music"
import PlayerButton from "./PlayerButton"

type SongListItemProps = {
  song: Song,
  playlistId: string
}

export default function SongListItem({ song, playlistId }: SongListItemProps) {
  return (
    <div>
      <PlayerButton action={() => playSong(song.id, playlistId)} iconClass="play" />
      <Link to={`/${song.id}`}>{song.name}</Link> <Link to={`edit/${song.id}`}>Edit</Link>
    </div>
  )
}
