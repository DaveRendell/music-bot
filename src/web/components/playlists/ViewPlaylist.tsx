import * as React from "react"
import { Redirect, useParams } from "react-router"
import usePlaylist from "../../hooks/usePlaylist"
import * as api from "../../api/playlists"
import { Link } from "react-router-dom"

type ViewPlaylistRouteParams = {
  id: string
}

export default function ViewPlaylist() {
  const { id } = useParams<ViewPlaylistRouteParams>()
  const playlist = usePlaylist(id)
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
      <p>Todo: list songs...</p>
    </div>
  )
}