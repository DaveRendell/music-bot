export default class AmbienceNotFoundError extends Error {
  statusCode = 404
  constructor(id: string) {
    super("Could not find ambience with id " + id)
  }
}
