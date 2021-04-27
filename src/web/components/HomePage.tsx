import * as React from "react"
import Song from "../../common/models/song"
import { shuffle } from "../api/music"
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
        return (
            <div>
                <button onClick={() => shuffle()}>Shuffle</button>
                <ul>
                    {songs.map((song, idx) => (
                        <SongListItem key={idx} index={idx} song={song} />
                    ))}
                </ul>
            </div>        
        )
    } else {
        return <p>Loading...</p>
    }
}
