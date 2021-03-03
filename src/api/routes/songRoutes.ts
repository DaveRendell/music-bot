import * as express from "express"
import Song from "../../common/models/song"
import Create from "../../common/types/create"
import Edit from "../../common/types/edit"
import * as db from "../database/songRepository"

const router = express.Router()

router.get("/", async (req, res) => {
    const songs = await db.listSongs()
    res.send(JSON.stringify(songs))
})

router.get("/:id", async (req, res) => {
    console.log(req.params["id"])
    const song = await db.getSong(req.params["id"])
    res.send(JSON.stringify(song))
})

router.post("/", async (req, res) => {
    const song = JSON.parse(req.body) as Create<Song>
    const result = await db.addSong(song)
    res.status(201).send(JSON.stringify(result))
})

router.put("/:id", async (req, res) => {
    const edit = { id: req.params["id"], ...JSON.parse(req.body) } as Edit<Song>
    const result = await db.updateSong(edit)
    res.send(JSON.stringify(result))
})

router.delete("/:id", async (req, res) => {
    const result = await db.deleteSong(req.params["id"])
    res.status(204).send()
})

export default router
