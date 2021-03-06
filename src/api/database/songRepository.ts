import Song from "../../common/models/song";
import { readState, writeState } from "./db"
import * as uuid from "uuid"
import Create from "../../common/types/create";
import Edit from "../../common/types/edit";
import State from "./state";
import SongNotFoundError from "../errors/songNotFoundError"
import PlaylistNotFoundError from "../errors/playlistNotFoundError";
import * as ytdl from "ytdl-core"

export async function listSongs(): Promise<Song[]> {
    const state = await readState()
    return state.songs
}

export async function getSong(id: string): Promise<Song> {
    const state = await readState()
    return state.songs[getSongIndexById(id, state)]
}

export async function addSong(song: Omit<Song, "id" | "length">): Promise<Song> {
    const state = await readState()

    const videoInfo = await ytdl.getBasicInfo(song.url)
    const length = parseInt(videoInfo.videoDetails.lengthSeconds)
    const youtubeTitle = videoInfo.videoDetails.title
    
    const id = uuid.v4()
    const newSong: Song = {
        id,
        length,
        name: song.name || youtubeTitle,
        url: song.url
    }
    state.songs.push(newSong)

    await writeState(state)
    return newSong
}

export async function updateSong(song: Edit<Song>): Promise<Song> {
    const state = await readState()
    const index = getSongIndexById(song.id, state)
    const oldSong = state.songs[index]

    const newSong = { ...oldSong, ...song }
    state.songs[index] = newSong

    await writeState(state)
    return newSong
}

export async function deleteSong(id: string): Promise<void> {
    const state = await readState()
    const index = getSongIndexById(id, state)
    state.songs.splice(index, 1)

    state.playlists = state.playlists.map(playlist => {
        return {
            ...playlist,
            songIds: playlist.songIds.filter(songId => songId !== id)}
    })

    await writeState(state)
    return
}

export async function listSongsForPlaylist(playlistId: string): Promise<Song[]> {
  const state = await readState()
  const playlist = state.playlists.find(pl => pl.id === playlistId)
  if (!playlist) {
      throw new PlaylistNotFoundError(playlistId)
  }
  return playlist.songIds
    .map(id => getSongIndexById(id, state))
    .map(idx => state.songs[idx])
}

function getSongIndexById(id: string, state: State): number {
    const index = state.songs.findIndex(song => song.id === id)
    if (index == -1) {
        throw new SongNotFoundError(id)
    }
    return index
}
