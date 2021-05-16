import * as React from "react"
import Ambience from "../../../common/models/ambience"

type AmbienceFormProps = {
  onSubmit: (ambience: Omit<Ambience, "id">) => void
  currentValue?: Omit<Ambience, "id">
  buttonPrompt: string
}

export default function AmbienceForm(
  { onSubmit, currentValue, buttonPrompt }: AmbienceFormProps
) {
  const [ambience, updateAmbience] =
    React.useState<Omit<Ambience, "id">>(
      {
        name: currentValue?.name || "",
        emoji: currentValue?.emoji || "",
        url: currentValue?.url || ""
      })
  
    async function submitForm(event: React.SyntheticEvent) {
      event.preventDefault()
      onSubmit(ambience)
    }

    return (
      <form onSubmit={submitForm}>
        <fieldset>
          <label>Emoji: </label>
          <input
            type="text"
            value={ambience.emoji}
            onChange={e => updateAmbience({ ...ambience, emoji: e.target.value })}
          />
        </fieldset>
        <fieldset>
          <label>Name: </label>
          <input
            type="text"
            value={ambience.name}
            onChange={e => updateAmbience({ ...ambience, name: e.target.value })}
          />
        </fieldset>
        <fieldset>
          <label>YouTube URL: </label>
          <input
            type="text"
            value={ambience.url}
            onChange={e => updateAmbience({ ...ambience, url: e.target.value })}
          />
        </fieldset>
        <input type="submit" value={buttonPrompt} />
      </form>
    )
}