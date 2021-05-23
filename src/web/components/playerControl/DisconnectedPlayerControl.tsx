import * as React from "react"
import "../../styles/floating-selector.scss"
import "../../styles/hang-right.scss"

export default function DisconnectedPlayerControl() {
  const [switcherOpen, setSwitcherOpen] = React.useState(false)

  function pickOption(id: string) {
    setSwitcherOpen(false)
  }

  function toggleSwitcher() {
    setSwitcherOpen(toggle => !toggle)
  }

  return (
    <div>
      <span>Not connected to a voice channel.</span>
      {
        switcherOpen && (
          <div className="floating-selector">
            <div><button onClick={() => pickOption("1")}>Option 1</button></div>
            <div><button onClick={() => pickOption("2")}>Option 2</button></div>
          </div>
        )
      }
      <button className="hang-right" onClick={toggleSwitcher}>Connect to channel</button>
    </div> 

  )
}
