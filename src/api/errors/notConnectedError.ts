export default class NotConnectedError extends Error {
  statusCode = 400
  constructor() {
    super("Not currently connected to a voice channel.")
  }
}
