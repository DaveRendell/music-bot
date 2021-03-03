import { get } from "./api"

export function sendTestMessage(): Promise<{}> {
  return get("/sendTestMessage")
}
