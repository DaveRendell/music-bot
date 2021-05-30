import { Controller, Get, Path, Query, Route } from "@tsoa/runtime";
import DiscordServer from "../../common/models/discordServer";
import { listServers } from "../discord";

@Route("connection")
export class ConnectionController extends Controller {
  @Get("servers")
  public getServers(): Promise<DiscordServer[]> {
    return listServers()
  }
}
