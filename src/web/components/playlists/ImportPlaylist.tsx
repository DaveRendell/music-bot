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
      <h1>Import YouTube playlist</h1>
      <form onSubmit={getPlaylist}>
        <fieldset>
          <label>YouTube URL: </label>
          <input type="text" value={playlistUrl} onChange={e => setPlaylistUrl(e.target.value)} />
        </fieldset>
        <input type="submit" value="Fetch playlist" disabled={submitted} />
      </form>
    </div>
  )
}
