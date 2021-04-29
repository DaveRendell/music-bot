import PlayerState from "../common/models/playerState"
import { listSongs, listSongsForPlaylist } from "./database/songRepository"
import { playSong } from "./discord"

let playerState: PlayerState = {
  playlist: [],
  nowPlayingIndex: 0
}

export async function playAllSongs(startSongId: string, playlistId: string) {
  const songs = await listSongsForPlaylist(playlistId)
  const startIndex = songs.findIndex(song => song.id === startSongId)

  if (startIndex === -1) {
    throw new Error(`Song with id ${startSongId} not found`)
  }

  playerState = {
    playlist: songs,
    nowPlayingIndex: startIndex
  }

  playSong(songs[startIndex].url)
}

export async function shuffleSongs(playlistId: string) {
  const songs = await listSongsForPlaylist(playlistId)
  const shuffledPlaylist = shuffleArray(songs)
  playerState = {
    playlist: shuffledPlaylist,
    nowPlayingIndex: 0
  }
  playSong(shuffledPlaylist[0].url)
}

function shuffleArray<T>(input: T[]) {
  let array = input.slice()
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

export function onSongFinish() {
  // Plays the next song in the list
  let newNowPlayingIndex = (playerState.nowPlayingIndex + 1) % playerState.playlist.length
  let nextSong = playerState.playlist[newNowPlayingIndex]
  console.log(`Playing song: ${JSON.stringify(nextSong, null, 2)}`)
  playerState = { ...playerState, nowPlayingIndex: newNowPlayingIndex }
  playSong(nextSong.url)
}