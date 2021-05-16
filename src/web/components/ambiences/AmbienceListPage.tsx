import * as React from "react"
import useAmbiences from "../../hooks/useAmbiences"
import LinkButton from "../LinkButton"
import PlayerButton from "../PlayerButton"
import { setAmbience } from "../../api/music"

export default function AmbienceListPage() {
  const { loaded, ambiences } = useAmbiences()

  if (!loaded) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1><LinkButton to="/" iconClass="arrow-left" /> Ambiences</h1>
      <LinkButton to="/ambience/new" iconClass="plus" text="Add ambience" />
      <div>
        {ambiences.map(ambience => (
          <div key={ambience.id}>
            <PlayerButton action={() => setAmbience(ambience.id)} iconClass="play" />
            <span>{ambience.emoji} {ambience.name} </span>
            <LinkButton to={`/ambience/${ambience.id}/edit`} text="Edit" />
          </div>
        ))}
      </div>
    </div>
  )
}