import DiscordChannel from "./discordChannel";

type DiscordServer = {
  id: string,
  name: string,
  channels: DiscordChannel[]
}

export default DiscordServer
