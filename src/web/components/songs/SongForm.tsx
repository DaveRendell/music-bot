import * as React from "react"
import Song from "../../../common/models/song";

type SongFormProps = {
  onSubmit: (song: Omit<Song, "id">) => void
  currentValue?: Omit<Song, "id">
  buttonPrompt: string
}

export default function SongForm(
  { onSubmit, currentValue, buttonPrompt}: SongFormProps
) {
  const [song, updateSong] =
    React.useState<Omit<Song, "id">>(
      {
        name: currentValue?.name || "",
        url: currentValue?.url || ""
      })

  async function submitForm(event: React.SyntheticEvent) {
    event.preventDefault()
    onSubmit(song)
  }

  return (
    <form onSubmit={submitForm}>
        <fieldset>
          <label>Name: </label>
          <input
              type="text"
              value={song.name}
              onChange={e => updateSong({ ...song, name: e.target.value})}
          />
        </fieldset>
        <fieldset>
          <label>YouTube URL: </label>
          <input
              type="text"
              value={song.url}
              onChange={e => updateSong({ ...song, url: e.target.value})}
          />
        </fieldset>
        <input type="submit" value={buttonPrompt} />
    </form>
)
}