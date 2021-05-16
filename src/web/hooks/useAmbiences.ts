import * as React from "react"
import Ambience from "../../common/models/ambience";
import { listAmbiences } from "../api/ambiences";

type AmbiencesResult = {
  loaded: boolean,
  ambiences: Ambience[]
} 

export default function useAmbiences(): AmbiencesResult {
  const [loaded, setLoaded] = React.useState(false)
  const [ambiences, setAmbiences] = React.useState<Ambience[]>([])

  React.useEffect(() => {
    listAmbiences()
      .then(setAmbiences)
      .then(() => setLoaded(true))
  }, [])

  return { loaded, ambiences }
}
