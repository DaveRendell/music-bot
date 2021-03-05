import * as React from "react"
import Song from "../../common/models/song";
import * as api from "../api/songs"

export default function useSong(id: string): Song | null {
  const [song, setSong] = React.useState<Song | null>(null)

  React.useEffect(() => {
    api.getSong(id).then(setSong)
  }, [id])

  return song
}
