import {
  Body,
  Controller,
  Get,
  Path,
  Put,
  Post,
  Route,
  Delete,
} from "tsoa"
import Song from "../../common/models/song"
import * as songs from "../database/songRepository"
import Edit from "../../common/types/edit"

@Route("songs")
export class SongsController extends Controller {
  @Get()
  public async getSongs(): Promise<Song[]> {
    return songs.listSongs()
  }

  @Get("{songId}")
  public async getSong(
    @Path() songId: string
  ): Promise<Song> {
    return songs.getSong(songId)
  }

  @Post()
  public async createSong(
    @Body() requestBody: Pick<Song, "name" | "url">
  ): Promise<Song> {
    this.setStatus(201)
    return songs.addSong(requestBody)
  }

  @Put("{songId}")
  public async updateSong(
    @Path() songId: string,
    @Body() requestBody: Pick<Song, "name" | "url">
  ): Promise<Song> {
    return songs.updateSong({...requestBody, id: songId})
  }

  @Delete("{songId}")
  public async deleteSong(
    @Path() songId: string
  ) {
    return songs.deleteSong(songId)
  }
}
