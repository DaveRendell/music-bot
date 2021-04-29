import * as React from "react"
import { Link } from "react-router-dom"
import { shuffle } from "../api/music"
import usePlaylistSongs from "../hooks/usePlaylistSongs"
import SongListItem from "./SongListItem"

type SongListProps = {
  playlistId: string
}

export default function SongList(
  { playlistId }: SongListProps
) {
  const songs = usePlaylistSongs(playlistId)
  return (
    <div>
      <Link to={`/playlist/${playlistId}/addSong`}>Add song</Link>
      <button onClick={() => shuffle(playlistId)}>Shuffle</button>
      <ul>
        {songs.map((song, idx) => (
          <SongListItem key={idx} playlistId={playlistId} song={song} />
        ))}
      </ul>
    </div>
  )
}
