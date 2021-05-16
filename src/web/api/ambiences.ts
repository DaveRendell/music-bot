import Ambience from "../../common/models/ambience"
import { del, get, post, put } from "./api"

export async function listAmbiences(): Promise<Ambience[]> {
  const response = await get("/ambiences")
  return response as Ambience[]
}

export async function getAmbience(id: string): Promise<Ambience> {
  const response = await get("/ambiences/" + id)
  return response as Ambience
}

export async function addAmbience(ambience: Omit<Ambience, "id">): Promise<Ambience> {
  const response = await post("/ambiences", JSON.stringify(ambience))
  return response as Ambience
}

export async function updateAmbience(id: string, ambience: Omit<Ambience, "id">): Promise<Ambience> {
  const response = await put("/ambiences/" + id, JSON.stringify(ambience))
  return response as Ambience
}

export async function deleteAmbience(id: string): Promise<void> {
  return del("/ambiences/" + id)
}
