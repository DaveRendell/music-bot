import * as React from "react"
import { Redirect } from "react-router"
import Playlist from "../../../common/models/playlist"
import { addPlaylist } from "../../api/playlists"
import PlaylistForm from "./PlaylistForm"

export default function AddPlaylist() {
  const [playlistId, setPlaylistId] = React.useState<String | null>(null)

  if (playlistId) {
    return <Redirect to={`/playlist/${playlistId}`} />
  }

  async function onSubmit(playlist: Omit<Playlist, "id">) {
    const { id } = await addPlaylist(playlist)
    setPlaylistId(id)
  }

  return (
    <div>
      <h1>Add a new playlist</h1>
      <PlaylistForm onSubmit={onSubmit} buttonPrompt="Add" />
    </div>
  )
}