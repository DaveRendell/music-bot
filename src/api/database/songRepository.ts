import Song from "../../common/models/song";
import { readState, writeState } from "./db"
import * as uuid from "uuid"
import Create from "../../common/types/create";
import Edit from "../../common/types/edit";
import State from "./state";
import SongNotFoundError from "../errors/songNotFoundError"

export async function listSongs(): Promise<Song[]> {
    const state = await readState()
    return state.songs
}

export async function getSong(id: string): Promise<Song> {
    const state = await readState()
    return state.songs[getSongIndexById(id, state)]
}

export async function addSong(song: Create<Song>): Promise<Song> {
    const state = await readState()
    
    const id = uuid.v4()
    const newSong = {id, ...song}
    state.songs.push(newSong)

    await writeState(state)
    return newSong
}

export async function updateSong(song: Edit<Song>): Promise<Song> {
    const state = await readState()
    const index = state.songs.findIndex(song => song.id === song.id)
    if (index == -1) {
        throw new Error(`Song with id ${song.id} not found`)
    }
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

    await writeState(state)
    return
}

function getSongIndexById(id: string, state: State): number {
    const index = state.songs.findIndex(song => song.id === id)
    if (index == -1) {
        throw new SongNotFoundError(id)
    }
    return index
}
