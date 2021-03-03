import * as React from "react"
import { Redirect } from "react-router-dom"
import { addSong } from "../api/songs"

export default function AddSong() {
    const [name, setName] = React.useState<string>()
    const [url, setUrl] = React.useState<string>()
    const [submitted, setSubmitted] = React.useState<boolean>(false)
    const [finished, setFinished] = React.useState<boolean>(false)

    if (finished) {
        return <Redirect to="/"/>
    }

    async function submitForm(event: React.SyntheticEvent) {
        event.preventDefault()
        setSubmitted(true)
        await addSong({name, url})
        setFinished(true)
    }

    return (
        <form onSubmit={submitForm}>
            <label>Name</label>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <label>YouTube URL</label>
            <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
            />
            <input type="submit" value="Add" />
        </form>
    )
}
