import Playlist from "../../common/models/playlist"
import Song from "../../common/models/song"

type State = {
    songs: Song[],
    playlists: Playlist[]
}

export default State
