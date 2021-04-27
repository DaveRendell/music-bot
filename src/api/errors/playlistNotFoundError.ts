export default class PlaylistNotFoundError extends Error {
  statusCode = 404
  constructor(id: string) {
    super("Could not find playlist with id " + id)
  }
}
