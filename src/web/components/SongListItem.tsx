import * as React from "react"
import Song from "../../common/models/song"
import { Link } from "react-router-dom"

type SongListItemProps = {
  song: Song
}

export default function SongListItem({ song }: SongListItemProps) {
  return (
    <li>
      {song.name}: {song.url} <Link to={`edit/${song.id}`}>Edit</Link>
    </li>
  )
}
