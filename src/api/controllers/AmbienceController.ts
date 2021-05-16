import { Controller, Get, Route, Path, Post, Body, Put, Delete } from "@tsoa/runtime";
import Ambience from "../../common/models/ambience";
import * as ambiences from "../database/ambienceRepository"

@Route("ambiences")
export class AmbienceController extends Controller {
  @Get()
  public async getAmbiences(): Promise<Ambience[]> {
    return ambiences.listAmbiences()
  }

  @Get("{ambienceId}")
  public async getAmbience(
    @Path() ambienceId: string
  ): Promise<Ambience> {
    return ambiences.getAmbience(ambienceId)
  }

  @Post()
  public async createAmbience(
    @Body() requestBody: Pick<Ambience, "name" | "emoji" | "url">
  ): Promise<Ambience> {
    this.setStatus(201)
    return ambiences.addAmbience(requestBody)
  }

  @Put("{ambienceId}")
  public async updateAmbience(
    @Path() ambienceId: string,
    @Body() requestBody: Pick<Ambience, "name" | "emoji" | "url">
  ): Promise<Ambience> {
    return ambiences.updateAmbience({...requestBody, id: ambienceId})
  }

  @Delete("{ambienceId}")
  public async deleteAmbience(
    @Path() ambienceId: string
  ): Promise<void> {
    return ambiences.deleteAmbience(ambienceId)
  }
}
