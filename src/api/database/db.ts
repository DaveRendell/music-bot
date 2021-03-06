import * as fs from "fs/promises"
import State from "./state";

const DB_FILE = "database.json"

export async function readState(): Promise<State> {
    await fs.access(DB_FILE)
        .catch(() => 
            fs.writeFile(DB_FILE, JSON.stringify(defaultState)))
    const fileContents = await fs.readFile(DB_FILE, "utf8")
    return JSON.parse(fileContents) as State
}

export async function writeState(state: State): Promise<void> {
    const stateAsJson = (process.env.NODE_ENV === "production")
        ? JSON.stringify(state)
        : JSON.stringify(state, null, 2)
    return fs.writeFile(DB_FILE, stateAsJson, "utf8")
}

const defaultState: State = {
    songs: []
}
