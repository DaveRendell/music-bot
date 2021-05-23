import { Controller, Get, Path, Query, Route } from "@tsoa/runtime";
import PlayerState from "../../common/models/playerState";
import { getSong } from "../database/songRepository";
import * as musicService from "../musicService";


@Route("music")
export class MusicController extends Controller {
  @Get("playSong/{songId}")
  public async playSong(
    @Path() songId: string,
    @Query() playlistId: string
  ): Promise<void> {
    console.log(`Request to play song ${songId}`)
    const song = await getSong(songId)
    console.log(`Song found: ${JSON.stringify(song, null, 2)}`)
    await musicService.playAllSongs(song.id, playlistId)
    this.setStatus(204)
    return
  }

  @Get("setAmbience/{ambienceId}")
  public async setAmbience(
    @Path() ambienceId: string
  ): Promise<void> {
    return musicService.setAmbience(ambienceId)
  }

  @Get("stopAmbience")
  public async stopAmbience(): Promise<void> {
    return musicService.stopAmbience()
  }

  @Get("shuffle/{playlistId}")
  public async shuffle(
    @Path() playlistId: string
  ): Promise<void> {
    console.log("Shuffling songs in playlist " + playlistId)
    await musicService.shuffleSongs(playlistId)    
    this.setStatus(204)
    return
  }

  @Get()
  public async getPlayerState(): Promise<PlayerState> {
    return musicService.getPlayerState()
  }

  @Get("playpause")
  public async playPause() {
    return musicService.playPause()
  }

  @Get("stop")
  public async stop() {
    return musicService.stop()
  }

  @Get("skip")
  public async skip() {
    return musicService.skip()
  }
}
