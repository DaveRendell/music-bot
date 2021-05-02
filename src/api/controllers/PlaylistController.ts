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
import Playlist from "../../common/models/playlist"
import Song from "../../common/models/song"
import * as playlists from "../database/playlistRepository"

@Route("playlists")
export class PlaylistsController extends Controller {
  @Get()
  public async getPlaylists(): Promise<Playlist[]> {
    return playlists.listPlaylists()
  }

  @Get("{playlistId}")
  public async getPlaylist(
    @Path() playlistId: string
  ): Promise<Playlist> {
    return playlists.getPlaylist(playlistId)
  }

  @Post("{playlistId}/songs")
  public async addSongToPlaylist(
    @Path() playlistId: string,
    @Body() requestBody: Pick<Song, "name" | "url">
  ): Promise<Song> {
    this.setStatus(201)
    return playlists.addSongToPlaylist(playlistId, requestBody)
  }

  @Post()
  public async createPlaylist(
    @Body() requestBody: Pick<Playlist, "name" | "songIds">
  ): Promise<Playlist> {
    this.setStatus(201)
    return playlists.addPlaylist(requestBody)
  }

  @Put("{playlistId}")
  public async updatePlaylist(
    @Path() playlistId: string,
    @Body() requestBody: Pick<Playlist, "name" | "songIds">
  ): Promise<Playlist> {
    return playlists.updatePlaylist({ ...requestBody, id: playlistId })
  }

  @Delete("{playlistId}")
  public async deletePlaylist(
    @Path() playlistId: string
  ): Promise<void> {
    return playlists.deletePlaylist(playlistId)
  }

  @Post("import")
  public async importPlaylist(
    @Body() body: { playlistUrl: string }
  ): Promise<Playlist> {
    return playlists.importPlaylist(body.playlistUrl)
  }
}
