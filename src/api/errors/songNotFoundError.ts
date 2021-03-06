export default class SongNotFoundError extends Error {
  statusCode = 404
  constructor(id: string) {
    super("Could not find song with id " + id)
  }
}
