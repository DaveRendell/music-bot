
import { del, get, post, put } from "./api";

export async function playSong(songId: string): Promise<void> {
  return get(`/music/playSong/${songId}`)
}