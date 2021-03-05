import Song from "../../common/models/song";
import Create from "../../common/types/create";
import Edit from "../../common/types/edit";
import { del, get, post, put } from "./api";

export async function listSongs(): Promise<Song[]> {
    const response = await get("/songs")
    return response as Song[]
}

export async function getSong(id: string): Promise<Song> {
    const response = await get("/songs/" + id)
    return response as Song
}

export async function addSong(song: Create<Song>): Promise<Song> {
    const response = await post("/songs", JSON.stringify(song))
    return response as Song
}

export async function updateSong(song: Edit<Song>): Promise<Song> {
    const id = song.id
    const response = await put("/songs/" + id, JSON.stringify(song))
    return response as Song
}

export async function deleteSong(id: string): Promise<void> {
    return del("/songs/" + id)
}