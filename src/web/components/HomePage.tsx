import * as React from "react"
import Song from "../../common/models/song"
import { listSongs } from "../api/songs"
import SongListItem from "./SongListItem"

export default function HomePage() {
    const [loaded, setLoaded] = React.useState<boolean>(false)
    const [songs, setSongs] = React.useState<Song[]>([])

    React.useEffect(() => {
        listSongs()
            .then(setSongs)
            .then(() => setLoaded(true))
    }, [])

    if (loaded) {
        return <ul>
            {songs.map((song, idx) => (
                <SongListItem key={idx} song={song} />
            ))}
        </ul>
    } else {
        return <p>Loading...</p>
    }
}
