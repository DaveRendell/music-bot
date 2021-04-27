import { Controller, Get, Path, Route } from "@tsoa/runtime";
import { getSong } from "../database/songRepository";
import { playSong } from "../discord";
import { playAllSongs, shuffleSongs } from "../musicService";

@Route("music")
export class MusicController extends Controller {
  @Get("playSong/{songId}")
  public async playSong(
    @Path() songId: string
  ): Promise<void> {
    console.log(`Request to play song ${songId}`)
    const song = await getSong(songId)
    console.log(`Song found: ${JSON.stringify(song, null, 2)}`)
    await playAllSongs(song.id)
    this.setStatus(204)
    return
  }

  @Get("shuffle")
  public async shuffle(): Promise<void> {
    console.log("Shuffling all songs")
    await shuffleSongs()    
    this.setStatus(204)
    return
  }
}