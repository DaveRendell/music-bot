import * as React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import { sendTestMessage } from "../api/testMethod"
import AddSong from "./songs/AddSong"
import HomePage from "./HomePage"
import EditSong from "./songs/EditSong"
import ViewSong from "./songs/ViewSong"

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/new">
          <AddSong />
        </Route>
        <Route path="/edit/:id">
          <EditSong />
        </Route>
        <Route path="/:id">
          <ViewSong />
        </Route>
        <Route path="/" exact>
          <Link to="/new">Add song</Link>
          <HomePage />
          <p>Push the button:</p>
          <button onClick={sendTestMessage}>Push me</button>
        </Route>
      </Switch>
    </Router>
  )
}
