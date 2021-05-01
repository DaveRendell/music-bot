
import { del, get, post, put } from "./api";
import PlayerState from "../../common/models/playerState"

export async function playSong(songId: string, playlistId): Promise<void> {
  return get(`/music/playSong/${songId}`, ["playlistId=" + playlistId])
}

export async function shuffle(playlistId: string): Promise<void> {
  return get("/music/shuffle/" + playlistId)
}

export async function getPlayerState(): Promise<PlayerState> {
  return get("/music")
}

export async function playPause(): Promise<void> {
  return get("/music/playPause")
}

export async function skip(): Promise<void> {
  return get("/music/skip")
}

export async function stop(): Promise<void> {
  return get("/music/stop")
}
