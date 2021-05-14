import * as React from "react"
import { Redirect, useParams } from "react-router"
import Playlist from "../../../common/models/playlist"
import { updatePlaylist } from "../../api/playlists"
import usePlaylist from "../../hooks/usePlaylist"
import PlaylistForm from "./PlaylistForm"
type EditPlaylistRouteParams = {
  id: string
}

export default function EditPlaylist() {
  const { id } = useParams<EditPlaylistRouteParams>()
  const playlist = usePlaylist(id)
  const [finished, setFinished] = React.useState(false)

  if (finished) {
    return <Redirect to={`/playlist/${playlist.id}`} />
  }

  if (!playlist) {
    return <p>Loading...</p>
  }

  async function onSubmit(updatedPlaylist: Omit<Playlist, "id">) {
    await updatePlaylist(playlist.id, {...updatedPlaylist})
    setFinished(true)
  }

  return (
    <div>
      <h1>Edit playlist</h1>
      <PlaylistForm onSubmit={onSubmit} currentValue={playlist} buttonPrompt="Edit" />
    </div>
  )
}
