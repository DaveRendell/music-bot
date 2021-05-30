import { Controller, Get, Path, Put, Query, Route } from "@tsoa/runtime";
import DiscordServer from "../../common/models/discordServer";
import { joinChannel, listServers } from "../discord";

@Route("connection")
export class ConnectionController extends Controller {
  @Get("servers")
  public getServers(): Promise<DiscordServer[]> {
    return listServers()
  }

  @Get("connect/{channelId}")
  public async connectToChannel(
    @Path() channelId: string
  ): Promise<void> {
    return joinChannel(channelId)
  }
}
