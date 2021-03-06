import * as express from "express"
import Song from "../../common/models/song"
import Create from "../../common/types/create"
import Edit from "../../common/types/edit"
import * as db from "../database/songRepository"

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const songs = await db.listSongs()
        res.send(JSON.stringify(songs))
    } catch (err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const song = await db.getSong(req.params["id"])
        res.send(JSON.stringify(song))
    } catch (err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const song = req.body as Create<Song>
        const result = await db.addSong(song)
        res.status(201).send(JSON.stringify(result))
    } catch (err) {
        next(err)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const edit = { id: req.params["id"], ...req.body } as Edit<Song>
        const result = await db.updateSong(edit)
        res.send(JSON.stringify(result))
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        await db.deleteSong(req.params["id"])
        res.status(204).send()
    } catch (err) {
        next(err)
    }    
})

export default router
