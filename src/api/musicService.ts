import PlayerState from "../common/models/playerState"
import { listSongsForPlaylist } from "./database/songRepository"
import * as discordService from "./discord"
import * as Discord from "discord.js"
import { getAmbience } from "./database/ambienceRepository"
import { broadcastMessage } from "./websocket"

const  defaultPlayerState: Omit<PlayerState, "streamTime" | "isPaused" | "isConnected"> = {
  playlist: [],
  playlistId: "",
  nowPlayingIndex: 0,
  ambienceId: "",
}
let playerState = defaultPlayerState

let dispatcher: Discord.StreamDispatcher | null = null

function updatePlayerState(newFields: Partial<PlayerState>) {
  playerState = {
    ...playerState,
    ...newFields
  }
  broadcastPlayerState()
}

export function broadcastPlayerState() {
  getPlayerState()
    .then(JSON.stringify)
    .then(broadcastMessage)
}

export async function playAllSongs(startSongId: string, playlistId: string) {
  const songs = await listSongsForPlaylist(playlistId)
  const startIndex = songs.findIndex(song => song.id === startSongId)

  if (startIndex === -1) {
    throw new Error(`Song with id ${startSongId} not found`)
  }

  updatePlayerState({
    playlist: songs,
    playlistId,
    nowPlayingIndex: startIndex
  })

  dispatcher?.destroy()
  dispatcher = null
  dispatcher = await discordService.playSong(songs[startIndex].url)
}

export async function shuffleSongs(playlistId: string) {
  const songs = await listSongsForPlaylist(playlistId)
  const shuffledPlaylist = shuffleArray(songs)
  
  dispatcher?.destroy()
  dispatcher = null
  dispatcher = await discordService.playSong(shuffledPlaylist[0].url)

  updatePlayerState({
    playlist: shuffledPlaylist,
    playlistId,
    nowPlayingIndex: 0
  })
}

export async function setAmbience(ambienceId: string) {
  const ambience = await getAmbience(ambienceId)
  console.log(`Setting ambience to ${ambience.name}`)
  updatePlayerState({
    ambienceId: ambience.id
  })
  discordService.setAmbience(ambience.url)
}

export async function stopAmbience(): Promise<void> {
  console.log("Turning off ambience")
  updatePlayerState({
    ambienceId: undefined
  })
  return discordService.stopAmbience()
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
  broadcastPlayerState()
}

export async function skip(): Promise<void> {
  await onSongFinish()
}

export async function stop(): Promise<void> {
  dispatcher?.destroy()
  dispatcher = null
  discordService.disconnect()
  setTimeout(() => updatePlayerState(defaultPlayerState), 250)
}

export async function getPlayerState(): Promise<PlayerState> {
  return {
    ...playerState,
    streamTime: dispatcher ? dispatcher.streamTime : 0,
    isPaused: dispatcher ? dispatcher.paused : true,
    isConnected: discordService.isConnected()
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

export async function onSongFinish(): Promise<Discord.StreamDispatcher> {
  // Plays the next song in the list
  let newNowPlayingIndex = (playerState.nowPlayingIndex + 1) % playerState.playlist.length
  let nextSong = playerState.playlist[newNowPlayingIndex]
  console.log(`Playing: ${nextSong.name}`)
  
  updatePlayerState({ nowPlayingIndex: newNowPlayingIndex })
  dispatcher?.destroy()
  dispatcher = null
  dispatcher = await discordService.playSong(nextSong.url)

  broadcastPlayerState()
  
  return dispatcher
}
