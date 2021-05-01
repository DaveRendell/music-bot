import Song from "./song";

type PlayerState = {
  playlist: Song[]
  playlistId: string
  nowPlayingIndex: number
  streamTime: number
}

export default PlayerState;
