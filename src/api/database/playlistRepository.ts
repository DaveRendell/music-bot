import Playlist from "../../common/models/playlist";
import Create from "../../common/types/create";
import PlaylistNotFoundError from "../errors/playlistNotFoundError";
import { readState, writeState } from "./db";
import State from "./state";
import * as uuid from "uuid"
import Edit from "../../common/types/edit";
import Song from "../../common/models/song";
import { addSong } from "./songRepository";
import * as ytpl from "ytpl"

export async function listPlaylists(): Promise<Playlist[]> {
  const state = await readState()
  return state.playlists
}

export async function getPlaylist(id: string): Promise<Playlist> {
  const state = await readState()
  return state.playlists[getPlaylistIndexById(id, state)]
}

export async function addPlaylist(playlist: Create<Playlist>): Promise<Playlist> {
  const state = await readState()

  const id = uuid.v4()
  const newPlaylist = { id, ...playlist }
  state.playlists.push(newPlaylist)

  await writeState(state)
  return newPlaylist
}

export async function updatePlaylist(playlist: Edit<Playlist>): Promise<Playlist> {
  const state = await readState()

  const index = getPlaylistIndexById(playlist.id, state)
  const oldPlaylist = state.playlists[index]

  const newPlaylist = { ...oldPlaylist, ...playlist }
  state.playlists[index] = newPlaylist

  await writeState(state)
  return newPlaylist
}

export async function deletePlaylist(id: string): Promise<void> {
  const state = await readState()
  const index = getPlaylistIndexById(id, state)
  state.playlists.splice(index, 1)

  await writeState(state)
  return
}

export async function addSongToPlaylist(playlistId: string, song: Omit<Song, "id" | "length">): Promise<Song> {
  const createdSong = await addSong(song)
  const state = await readState()

  const index = getPlaylistIndexById(playlistId, state)
  state.playlists[index].songIds.push(createdSong.id)

  await writeState(state)
  return createdSong
}

export async function importPlaylist(playlistUrl: string): Promise<Playlist> {
  const youtubePlaylist = await ytpl(playlistUrl)
  let songs: Song[] = []
  for (let item of youtubePlaylist.items) {
    const song = await addSong({name: "", url: item.shortUrl})
    songs.push(song)
  }
  return addPlaylist({
    name: youtubePlaylist.title,
    songIds: songs.map(song => song.id)
  })
}

function getPlaylistIndexById(id: string, state: State): number {
  const index = state.playlists.findIndex(playlist => playlist.id === id)
  if (index == -1) {
    throw new PlaylistNotFoundError(id)
  }
  return index
}
