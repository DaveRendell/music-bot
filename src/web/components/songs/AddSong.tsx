import * as React from "react"
import { Redirect, useParams } from "react-router-dom"
import { addSong } from "../../api/songs"
import Song from "../../../common/models/song"
import SongForm from "./SongForm"

type AddSongPathParams = {
    id: string
}

export default function AddSong() {
    const { id: playlistId } = useParams<AddSongPathParams>()
    const [submitted, setSubmitted] = React.useState<boolean>(false)
    const [finished, setFinished] = React.useState<boolean>(false)

    if (finished) {
        return <Redirect to={`/playlist/${playlistId}`}/>
    }

    async function onSubmit(song: Omit<Song, "id">) {
        setSubmitted(true)
        await addSong(song, playlistId)
        setFinished(true)
    }

    return (
        <SongForm onSubmit={onSubmit} buttonPrompt="Add" />
    )
}
