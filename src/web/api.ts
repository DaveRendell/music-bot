const BROWSER_BASE_URL = "http://localhost:3000"

export function sendTestMessage(): Promise<{}> {
  return fetch(BROWSER_BASE_URL + '/sendTestMessage')
}
