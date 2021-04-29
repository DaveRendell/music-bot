import * as React from "react"
import Song from "../../common/models/song"
import Playlist from "../../common/models/playlist"
import { shuffle } from "../api/music"
import { listSongs } from "../api/songs"
import { listPlaylists } from "../api/playlists"
import SongListItem from "./SongListItem"
import { Link } from "react-router-dom"

export default function HomePage() {
    const [loaded, setLoaded] = React.useState<boolean>(false)
    const [playlists, setPlaylists] = React.useState<Playlist[]>([])

    React.useEffect(() => {
        Promise.all([
            listPlaylists().then(setPlaylists)
        ]).then(() => setLoaded(true))
    }, [])

    const onClick = (playlistId: string) => {
        return function(e: React.SyntheticEvent) {
            e.preventDefault()
            shuffle(playlistId)
        }
    }

    if (loaded) {
        return (
            <div>
                <Link to="/playlist/new">Add playlist</Link>
                <ul>
                    {playlists.map((playlist, idx) => (
                        <li key={idx}><button onClick={onClick(playlist.id)}>Shuffle</button> <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link></li>
                    ))}
                </ul>
            </div>        
        )
    } else {
        return <p>Loading...</p>
    }
}
