import PlayerState from "../common/models/playerState"
import { listSongsForPlaylist } from "./database/songRepository"
import { disconnect, playSong } from "./discord"
import * as Discord from "discord.js"

const  defaultPlayerState: Omit<PlayerState, "streamTime" | "isPaused"> = {
  playlist: [],
  playlistId: "",
  nowPlayingIndex: 0
}
let playerState = defaultPlayerState

let dispatcher: Discord.StreamDispatcher | null = null

export async function playAllSongs(startSongId: string, playlistId: string) {
  const songs = await listSongsForPlaylist(playlistId)
  const startIndex = songs.findIndex(song => song.id === startSongId)

  if (startIndex === -1) {
    throw new Error(`Song with id ${startSongId} not found`)
  }

  playerState = {
    playlist: songs,
    playlistId,
    nowPlayingIndex: startIndex
  }

  dispatcher?.destroy()
  dispatcher = null
  dispatcher = await playSong(songs[startIndex].url)
}

export async function shuffleSongs(playlistId: string) {
  const songs = await listSongsForPlaylist(playlistId)
  const shuffledPlaylist = shuffleArray(songs)
  playerState = {
    playlist: shuffledPlaylist,
    playlistId,
    nowPlayingIndex: 0
  }
  
  dispatcher?.destroy()
  dispatcher = null
  dispatcher = await playSong(shuffledPlaylist[0].url)
}

export async function playPause(): Promise<void> {
  if (!dispatcher) {
    return
  }

  if (dispatcher.paused) {
    // Due to an ongoing bug in Discord.JS, we have to do... this
    dispatcher.resume()
    dispatcher.pause()
    dispatcher.resume()
  } else {
    dispatcher.pause()
  }
}

export function skip(): Promise<void> {
  return onSongFinish()
}

export async function stop(): Promise<void> {
  playerState = defaultPlayerState
  dispatcher?.destroy()
  dispatcher = null
  disconnect()
}

export async function getPlayerState(): Promise<PlayerState> {

  return {
    ...playerState,
    streamTime: dispatcher ? dispatcher.streamTime : 0,
    isPaused: dispatcher ? dispatcher.paused : true
  }
}

function shuffleArray<T>(input: T[]) {
  let array = input.slice()
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

export async function onSongFinish() {
  // Plays the next song in the list
  let newNowPlayingIndex = (playerState.nowPlayingIndex + 1) % playerState.playlist.length
  let nextSong = playerState.playlist[newNowPlayingIndex]
  console.log(`Playing song: ${JSON.stringify(nextSong, null, 2)}`)
  playerState = { ...playerState, nowPlayingIndex: newNowPlayingIndex }

  dispatcher?.destroy()
  dispatcher = null
  dispatcher = await playSong(nextSong.url)
}
