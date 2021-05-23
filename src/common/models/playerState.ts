import Song from "./song";

type PlayerState = {
  playlist: Song[]
  playlistId: string
  nowPlayingIndex: number
  ambienceId: string
  streamTime: number
  isPaused: boolean
  isConnected: boolean
}

export default PlayerState;
