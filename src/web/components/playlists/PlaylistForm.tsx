import * as React from "react"
import Playlist from "../../../common/models/playlist"

type PlaylistFormProps = {
  onSubmit: (song: Omit<Playlist, "id">) => void
  currentValue?: Omit<Playlist, "id">
  buttonPrompt: string
}

export default function PlaylistForm(
  { onSubmit, currentValue, buttonPrompt }: PlaylistFormProps
) {
  const [playlist, updatePlaylist] = React.useState<Omit<Playlist, "id">>(
    {
      name: currentValue?.name || "",
      songIds: []
    })
  
  async function submitForm(event: React.SyntheticEvent) {
    event.preventDefault()
    onSubmit(playlist)
  }

  return (
    <form onSubmit={submitForm}>
      <fieldset>
        <label>Name: </label>
        <input
          type="text"
          value={playlist.name}
          onChange={e => updatePlaylist({ ...playlist, name: e.target.value })}
        />
      </fieldset>
      <input type="submit" value={buttonPrompt} />
    </form>
  )
}
