import * as React from "react"
import { setAmbience } from "../api/music"
import useAmbiences from "../hooks/useAmbiences"

type AmbienceSwitcherProps = {
  ambienceId: string
}

export default function AmbienceSwitcher({ ambienceId }: AmbienceSwitcherProps) {
  const { ambiences } = useAmbiences()
  const [id, setId] = React.useState(ambienceId)

  async function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault()
    setAmbience(e.target.value)
    setId(e.target.value)
  }
  
  return (
    <select value={id} onChange={onChange} className="ambience-switcher">
      {ambiences.map(ambience =>
        <option value={ambience.id}>{ambience.emoji} {ambience.name}</option>)}
    </select>
  )
}
