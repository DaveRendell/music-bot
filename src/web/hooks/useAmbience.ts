import * as React from "react"
import Ambience from "../../common/models/ambience";
import { getAmbience } from "../api/ambiences";

export default function useAmbience(id: string): Ambience | null {
  const [ambience, setAmbience] = React.useState<Ambience | null>(null)

  React.useEffect(() => {
    getAmbience(id).then(setAmbience)
  }, [id])

  return ambience
}
