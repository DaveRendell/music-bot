import Song from "../../common/models/song";
import { readState, writeState } from "./db"
import * as uuid from "uuid"

type CreateSong = Omit<Song, "id">
type EditSong = Partial<Song> & { id: string }

export async function listSongs(): Promise<Song[]> {
    const state = await readState()
    return state.songs
}

export async function getSong(id: string): Promise<Song> {
    const state = await readState()
    return state.songs.find(song => song.id === id)
}

export async function addSong(song: CreateSong): Promise<Song> {
    const state = await readState()
    
    const id = uuid.v4()
    const newSong = {id, ...song}
    state.songs.push(newSong)

    await writeState(state)
    return newSong
}

export async function updateSong(song: EditSong): Promise<Song> {
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
    const index = state.songs.findIndex(song => song.id === song.id)
    if (index == -1) {
        throw new Error(`Song with id ${id} not found`)
    }
    state.songs.splice(index, 1)

    await writeState(state)
    return
}
