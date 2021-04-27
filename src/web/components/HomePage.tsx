import * as React from "react"
import Song from "../../common/models/song"
import Playlist from "../../common/models/playlist"
import { shuffle } from "../api/music"
import { listSongs } from "../api/songs"
import { listPlaylists } from "../api/playlists"
import SongListItem from "./SongListItem"

export default function HomePage() {
    const [loaded, setLoaded] = React.useState<boolean>(false)
    const [songs, setSongs] = React.useState<Song[]>([])
    const [playlists, setPlaylists] = React.useState<Playlist[]>([])

    React.useEffect(() => {
        Promise.all([
            listSongs().then(setSongs),
            listPlaylists().then(setPlaylists)
        ]).then(() => setLoaded(true))
    }, [])

    if (loaded) {
        return (
            <div>
                <ul>
                    {playlists.map((playlist, idx) => (
                        <li key={idx}>{playlist.name}</li>
                    ))}
                </ul>
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
