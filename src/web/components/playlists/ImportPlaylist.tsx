import * as React from "react"
import { Redirect } from "react-router"
import { importPlaylist } from "../../api/playlists"

export default function ImportPlaylist() {
  const [playlistUrl, setPlaylistUrl] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const [importedPlaylistId, setImportedPlaylistId] = React.useState<string | null>(null)

  if (importedPlaylistId) {
    return <Redirect to={`/playlist/${importedPlaylistId}`} />
  }

  function getPlaylist(e: React.SyntheticEvent) {
    e.preventDefault()
    setSubmitted(true)
    importPlaylist(playlistUrl)
      .then(playlist => setImportedPlaylistId(playlist.id))
  } 

  return (
    <div>
      <form onSubmit={getPlaylist}>
        <input type="text" value={playlistUrl} onChange={e => setPlaylistUrl(e.target.value)} />
        <input type="submit" value="Fetch playlist" disabled={submitted} />
      </form>
    </div>
  )
}
