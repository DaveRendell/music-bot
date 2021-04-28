import * as React from "react"
import { Redirect, useParams } from "react-router"
import usePlaylist from "../../hooks/usePlaylist"
import * as api from "../../api/playlists"
import { Link } from "react-router-dom"
import usePlaylistSongs from "../../hooks/usePlaylistSongs"
import SongListItem from "../SongListItem"

type ViewPlaylistRouteParams = {
  id: string
}

export default function ViewPlaylist() {
  const { id } = useParams<ViewPlaylistRouteParams>()
  const playlist = usePlaylist(id)
  const songs = usePlaylistSongs(id)
  const [playlistDeleted, setPlaylistDeleted] = React.useState(false)

  if (!playlist) {
    return <p>Loading...</p>
  }

  if (playlistDeleted) {
    return <Redirect to="/" />
  }

  async function deletePlaylist(e: React.SyntheticEvent) {
    e.preventDefault()
    await api.deletePlaylist(playlist.id)
    setPlaylistDeleted(true)
  }

  return (
    <div>
      <p><Link to="/">Back</Link></p>
      <p><Link to={`/playlist/${playlist.id}/edit`}>Edit</Link></p>
      <p><button onClick={deletePlaylist}>Delete</button></p>
      <h1>{playlist.name}</h1>
      {songs.map((song, idx) => <SongListItem key={idx} song={song} index={idx}/>)} {/*QQ need to add playlist context for playing */}
    </div>
  )
}