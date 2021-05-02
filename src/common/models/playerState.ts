import Song from "./song";

type PlayerState = {
  playlist: Song[]
  playlistId: string
  nowPlayingIndex: number
  streamTime: number
  isPaused: boolean
}

export default PlayerState;
