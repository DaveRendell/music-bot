import * as express from "express"

const api = express()
const port = 3000

api.get("/", (req, res) => {
  res.send("Hello, World!")
})

api.listen(port, () => {
  console.log(`API running at http://localhost:${port}`)
})
