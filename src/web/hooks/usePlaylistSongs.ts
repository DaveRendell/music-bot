import * as React from "react"
import Song from "../../common/models/song";
import { listSongs } from "../api/songs";

export default function usePlaylistSongs(playlistId: string): Song[] {
  const [songs, setSongs] = React.useState<Song[]>([])

  React.useEffect(() => {
    listSongs(playlistId).then(setSongs)
  }, [playlistId])

  return songs
}
