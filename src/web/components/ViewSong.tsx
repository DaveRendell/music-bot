import * as React from "react"
import useSong from "../hooks/useSong"
import { useParams, Link, Redirect } from "react-router-dom"
import * as api from "../api/songs"

type ViewSongRouteParams = {
  id: string
}

export default function ViewSong() {
  const { id } = useParams<ViewSongRouteParams>()
  const song = useSong(id)
  const [songDeleted, setSongDeleted] = React.useState(false)

  if (!song) {
    return <p>Loading...</p>
  }

  if (songDeleted) {
    return <Redirect to="/" />
  }

  async function deleteSong(e: React.SyntheticEvent) {
    e.preventDefault()
    await api.deleteSong(song?.id || "")
    setSongDeleted(true)
  }

  return (
    <div>
      <p><Link to="/">Back</Link></p>
      <p><Link to={`/edit/${song.id}`}>Edit</Link></p>
      <p><button onClick={deleteSong}>Delete</button></p>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{song.name}</td>
          </tr>
          <tr>
            <th>YouTube URL</th>
            <td>{song.url}</td>
          </tr>
        </tbody>
    </table>
    </div>
    
  )
}
