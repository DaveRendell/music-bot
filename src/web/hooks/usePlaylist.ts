import * as React from "react"
import Playlist from "../../common/models/playlist"
import { getPlaylist } from "../api/playlists"

export default function usePlaylist(id: string): Playlist | null {
  const [playlist, setPlaylist] = React.useState<Playlist | null>(null)
  
  React.useEffect(() => {
    getPlaylist(id).then(setPlaylist)
  }, [id])

  return playlist
}
