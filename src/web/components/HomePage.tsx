import * as React from "react"
import Song from "../../common/models/song"
import Playlist from "../../common/models/playlist"
import { shuffle } from "../api/music"
import { listSongs } from "../api/songs"
import { listPlaylists } from "../api/playlists"
import SongListItem from "./SongListItem"
import { Link } from "react-router-dom"
import PlayerButton from "./PlayerButton"
import LinkButton from "./LinkButton"
import PlaylistListItem from "./PlaylistListItem"

export default function HomePage() {
    const [loaded, setLoaded] = React.useState<boolean>(false)
    const [playlists, setPlaylists] = React.useState<Playlist[]>([])

    React.useEffect(() => {
        Promise.all([
            listPlaylists().then(setPlaylists)
        ]).then(() => setLoaded(true))
    }, [])
    
    if (loaded) {
        return (
            <div>
                <LinkButton to="/playlist/new" iconClass="plus" text="Add playlist" />
                <LinkButton to="/playlist/import" iconClass="arrow-down" text="Import playlist" />
                <div>
                    {playlists.map((playlist, idx) => (
                        <PlaylistListItem key={idx} playlist={playlist} />
                    ))}
                </div>
            </div>        
        )
    } else {
        return <p>Loading...</p>
    }
}
