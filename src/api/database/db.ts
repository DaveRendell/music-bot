import * as fs from "fs/promises"
import State from "./state";

const DB_FILE = "database.json"

export async function readState(): Promise<State> {
    const fileContents = await fs.readFile(DB_FILE, "utf8")
    return JSON.parse(fileContents) as State
}

export async function writeState(state: State): Promise<void> {
    return fs.writeFile(DB_FILE, JSON.stringify(state), "utf8")
}
