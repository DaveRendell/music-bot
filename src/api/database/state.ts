import Ambience from "../../common/models/ambience"
import Playlist from "../../common/models/playlist"
import Song from "../../common/models/song"

type State = {
    songs: Song[],
    playlists: Playlist[],
    ambiences: Ambience[],
}

export default State
