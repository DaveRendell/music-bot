import { del, get, post, put } from "./api";
import DiscordServer from "../../common/models/discordServer"

export async function listServers(): Promise<DiscordServer[]> {
  return get("/connection/servers")
}

export async function joinChannel(channelId: string): Promise<void> {
  return get("/connection/connect/" + channelId)
}
