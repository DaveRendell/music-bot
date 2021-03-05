import * as React from "react"
import { Redirect } from "react-router-dom"
import { addSong } from "../api/songs"
import Song from "../../common/models/song"
import SongForm from "./SongForm"

export default function AddSong() {
    const [submitted, setSubmitted] = React.useState<boolean>(false)
    const [finished, setFinished] = React.useState<boolean>(false)

    if (finished) {
        return <Redirect to="/"/>
    }

    async function onSubmit(song: Omit<Song, "id">) {
        setSubmitted(true)
        await addSong(song)
        setFinished(true)
    }

    return (
        <SongForm onSubmit={onSubmit} buttonPrompt="Add" />
    )
}
