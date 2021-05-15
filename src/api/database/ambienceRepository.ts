import Ambience from "../../common/models/ambience";
import AmbienceNotFoundError from "../errors/ambienceNotFoundError";
import { readState, writeState } from "./db";
import * as uuid from "uuid"
import State from "./state";
import Edit from "../../common/types/edit";

export async function listAmbiences(): Promise<Ambience[]> {
  const state = await readState()
  return state.ambiences
}

export async function getAmbience(id: string): Promise<Ambience> {
  const state = await readState()
  return state.ambiences[getAmbienceIndexById(id, state)]
}

export async function addAmbience(ambience: Omit<Ambience, "id">): Promise<Ambience> {
  const state = await readState()

  const id = uuid.v4()

  const newAmbience: Ambience = {
    id,
    ...ambience
  }
  state.ambiences.push(newAmbience)

  await writeState(state)
  return newAmbience
}

export async function updateAmbience(ambience: Edit<Ambience>): Promise<Ambience> {
  const state = await readState()
  const index = getAmbienceIndexById(ambience.id, state)
  const oldAmbience = state.ambiences[index]

  const newAmbience = { ...oldAmbience, ...ambience }
  state.ambiences[index] = newAmbience

  await writeState(state)
  return newAmbience

}

export async function deleteAmbience(id: string): Promise<void> {
  const state = await readState()
  const index = getAmbienceIndexById(id, state)
  state.ambiences.splice(index, 1)

  await writeState(state)
  return
}

function getAmbienceIndexById(id: string, state: State): number {
  const index = state.ambiences.findIndex(ambience => ambience.id === id)
  if (index == -1) {
    throw new AmbienceNotFoundError(id)
  }
  return index
}
