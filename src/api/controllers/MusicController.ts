import { Controller, Get, Path, Route } from "@tsoa/runtime";
import { getSong } from "../database/songRepository";
import { playSong } from "../discord";

@Route("music")
export class MusicController extends Controller {
  @Get("playSong/{songId}")
  public async playSong(
    @Path() songId: string
  ): Promise<void> {
    console.log(`Request to play song ${songId}`)
    const song = await getSong(songId)
    console.log(`Song found: ${JSON.stringify(song, null, 2)}`)
    await playSong(song.url)
    this.setStatus(204)
    return
  }
}