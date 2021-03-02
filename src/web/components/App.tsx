import * as React from "react"
import { sendTestMessage } from "../api"

export default function App() {
  return (
    <div>
      <p>Push the button:</p>
      <button onClick={sendTestMessage}>Push me</button>
    </div>
  )
}
