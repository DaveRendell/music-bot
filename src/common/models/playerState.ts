import Song from "./song";

type PlayerState = {
  playlist: Song[]
  nowPlayingIndex: number
}

export default PlayerState;
