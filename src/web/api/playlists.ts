import Playlist from "../../common/models/playlist"
import Create from "../../common/types/create";
import Edit from "../../common/types/edit";
import { del, get, post, put } from "./api";

export async function listPlaylists(): Promise<Playlist[]> {
  const response = await get("/playlists")
  return response as Playlist[]
}

export async function getPlaylist(id: string): Promise<Playlist> {
  const response = await get("/playlists/" + id)
  return response as Playlist
}

export async function addPlaylist(playlist: Create<Playlist>): Promise<Playlist> {
  const response = await post("/playlists", JSON.stringify(playlist))
  return response as Playlist
}

export async function updatePlaylist(id: string, playlist: Pick<Playlist, "name" | "songIds">): Promise<Playlist> {
  const response = await put("/playlists/" + id, JSON.stringify(playlist))
  return response as Playlist
}

export async function deletePlaylist(id: string): Promise<void> {
  return del("/playlists/" + id)
}

export async function importPlaylist(playlistUrl: string): Promise<Playlist> {
  const response = await post("/playlists/import", JSON.stringify({playlistUrl}))
  return response as Playlist
}
