import * as React from "react"
import Playlist from "../../common/models/playlist"
import { listPlaylists } from "../api/playlists"
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
                <h1>🎵 Music Bot</h1>
                <LinkButton to="/playlist/new" iconClass="plus" text="Add playlist" />
                <LinkButton to="/playlist/import" iconClass="arrow-down" text="Import playlist" />
                <LinkButton to="/ambience" iconClass="cloud-rain" text="Manage ambiences" />
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
