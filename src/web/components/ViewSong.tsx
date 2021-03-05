import * as React from "react"
import useSong from "../hooks/useSong"
import { useParams, Link } from "react-router-dom"

type ViewSongRouteParams = {
  id: string
}

export default function ViewSong() {
  const { id } = useParams<ViewSongRouteParams>()
  const song = useSong(id)

  if (!song) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <p><Link to="/">Back</Link></p>
      <p><Link to={`/edit/${song.id}`}>Edit</Link></p>
      <table>
      <tr>
        <th>Name</th>
        <td>{song.name}</td>
      </tr>
      <tr>
        <th>YouTube URL</th>
        <tr>{song.url}</tr>
      </tr>
    </table>
    </div>
    
  )
}
