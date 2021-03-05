import * as React from "react"
import { Redirect } from "react-router-dom"
import { updateSong } from "../api/songs"
import Song from "../../common/models/song"
import SongForm from "./SongForm"
import useSong from "../hooks/useSong"
import { useParams } from "react-router-dom"

type EditSongRouteParams = {
    id: string
}

export default function EditSong() {
    const { id } = useParams<EditSongRouteParams>()
    const song = useSong(id)
    const [submitted, setSubmitted] = React.useState<boolean>(false)
    const [finished, setFinished] = React.useState<boolean>(false)

    async function onSubmit(updatedSong: Omit<Song, "id">) {
        setSubmitted(true)
        await updateSong({...updatedSong, id: song.id})
        setFinished(true)
    }

    if (finished) {
        return <Redirect to="/"/>
    }

    if (!song) {
        return <p>Loading...</p>
    }

    return (
        <SongForm onSubmit={onSubmit} currentValue={song} buttonPrompt="Edit" />
    )
}
