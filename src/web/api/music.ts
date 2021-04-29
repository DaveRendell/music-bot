
import { del, get, post, put } from "./api";

export async function playSong(songId: string, playlistId): Promise<void> {
  return get(`/music/playSong/${songId}`, ["playlistId=" + playlistId])
}

export async function shuffle(playlistId: string): Promise<void> {
  return get("/music/shuffle/" + playlistId)
}
