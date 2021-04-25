import * as React from "react"
import Song from "../../common/models/song"
import { Link } from "react-router-dom"
import { playSong } from "../api/music"

type SongListItemProps = {
  song: Song
}

export default function SongListItem({ song }: SongListItemProps) {
  return (
    <li>
      <button onClick={() => playSong(song.id)}>Play</button>
      <Link to={`/${song.id}`}>{song.name}</Link> <Link to={`edit/${song.id}`}>Edit</Link>
    </li>
  )
}
