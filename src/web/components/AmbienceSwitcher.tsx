import * as React from "react"
import Ambience from "../../common/models/ambience"
import { setAmbience, stopAmbience } from "../api/music"
import useAmbiences from "../hooks/useAmbiences"
import Twemoji from "react-emoji-render"
import "../styles/max-width.scss"

type AmbienceSwitcherProps = {
  ambienceId: string
}

export default function AmbienceSwitcher({ ambienceId }: AmbienceSwitcherProps) {
  const { ambiences } = useAmbiences()
  const [id, setId] = React.useState(ambienceId)
  const [switcherOpen, setSwitcherOpen] = React.useState(false)

  const selected: Ambience | undefined = ambiences.find(a => a.id === id)
  const selectedEmoji = selected ? selected.emoji : "❌";

  async function optionClicked(newId: string) {
    setAmbience(newId)
    setId(newId)
    setSwitcherOpen(false)
  }

  async function turnOffAmbience() {
    stopAmbience()
    setId(null)
    setSwitcherOpen(false)
  }

  function toggleSwitcher(e: React.SyntheticEvent) {
    e.preventDefault()
    setSwitcherOpen(value => !value)
  }

  return (
    <div className="ambience-switcher">
      { switcherOpen && (
        <div className="ambience-selector">
          <button 
              className="max-width"
              onClick={turnOffAmbience}>
              <Twemoji text="❌ Off" />
            </button>
          {ambiences.map(ambience => (
            <div key={ambience.id}>
              <button 
                className="max-width"
                onClick={() => optionClicked(ambience.id)}>
                <Twemoji text={ambience.emoji + " " + ambience.name} />
              </button>
            </div>))}
        </div>
      )}
      <button onClick={toggleSwitcher}>
        <Twemoji text={"Ambience: " + selectedEmoji} />
      </button>
    </div>
  )
}
