import * as React from "react"
import { Redirect } from "react-router"
import Ambience from "../../../common/models/ambience"
import { addAmbience } from "../../api/ambiences"
import LinkButton from "../LinkButton"
import AmbienceForm from "./AmbienceForm"

export default function CreateAmbience() {
  const [created, setCreated] = React.useState(false)

  if (created) {
    return <Redirect to="/ambience" />
  }

  async function onSubmit(ambience: Omit<Ambience, "id">) {
    await addAmbience(ambience)
    setCreated(true)
  }

  return (
    <div>
      <h1><LinkButton to="/ambiences" iconClass="arrow-left" /> Add new ambience</h1>
      <AmbienceForm
        onSubmit={onSubmit}
        buttonPrompt="Add"
      />
    </div>
  )
}