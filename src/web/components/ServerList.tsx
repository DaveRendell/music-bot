import * as React from "react"
import DiscordServer from "../../common/models/discordServer"
import { listServers } from "../api/connection"

export default function ServerList() {
  const [serverList, setServerList] = React.useState<DiscordServer[] | null>(null)

  React.useEffect(() => {
    listServers().then(setServerList)
  })

  if (serverList === null) {
    return <p>Loading channel list...</p>
  }

  return (
    <div>
      {
        serverList.map(server => (
          <div key={server.id}>
            <h3>{server.name}</h3>
            <div>
              {
                server.channels
                  .sort((c1, c2) => c2.activeUsers - c1.activeUsers)
                  .map(channel => (
                    <p key={channel.id}>{channel.name} - {channel.activeUsers} active users</p>
                  ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}
