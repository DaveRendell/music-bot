import * as React from "react"
import { Redirect, useParams } from "react-router"
import Ambience from "../../../common/models/ambience"
import { updateAmbience } from "../../api/ambiences"
import useAmbience from "../../hooks/useAmbience"
import AmbienceForm from "./AmbienceForm"

type EditAmbienceRouteProps = {
  id: string
}

export default function EditAmbience() {
  const { id } = useParams<EditAmbienceRouteProps>()
  const ambience = useAmbience(id)
  const [finished, setFinished] = React.useState(false)
  
  if (finished) {
    return <Redirect to="/" />
  }

  if (!ambience) {
    return <p>Loading...</p>
  }

  async function onSubmit(updatedAmbience: Omit<Ambience, "id">) {
    await updateAmbience(id, { ...updatedAmbience })
    setFinished(true)
  }

  return (
    <AmbienceForm onSubmit={onSubmit} currentValue={ambience} buttonPrompt="Edit" />
  )
}