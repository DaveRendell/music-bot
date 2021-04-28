import Song from "../../common/models/song";
import Create from "../../common/types/create";
import Edit from "../../common/types/edit";
import { del, get, post, put } from "./api";

export async function listSongs(playlistId: string | undefined = undefined): Promise<Song[]> {
    const query = playlistId ? ["playlistId=" + playlistId] : []
    const response = await get("/songs", query)
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

export async function updateSong(id: string, song: Pick<Song, "name" | "url">): Promise<Song> {
    const response = await put("/songs/" + id, JSON.stringify(song))
    return response as Song
}

export async function deleteSong(id: string): Promise<void> {
    return del("/songs/" + id)
}
