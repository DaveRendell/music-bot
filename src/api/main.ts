import * as express from "express"

const api = express()
const port = 3000

api.get("/sendTestMessage", (req, res) => {
  // TODO: Make this send a test message to Discord.
  console.log("Button pressed")
  
  // Return empty response
  res.status(204).send()
})

api.listen(port, () => {
  console.log(`API running on port ${port}`)
})
