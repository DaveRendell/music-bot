import * as React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import AddSong from "./songs/AddSong"
import HomePage from "./HomePage"
import EditSong from "./songs/EditSong"
import ViewSong from "./songs/ViewSong"
import AddPlaylist from "./playlists/AddPlaylist"
import EditPlaylist from "./playlists/EditPlaylist"
import ViewPlaylist from "./playlists/ViewPlaylist"
import usePlayerState from "../hooks/usePlayerState"
import PlayerControl from "./playerControl/PlayerControl"
import ImportPlaylist from "./playlists/ImportPlaylist"
import AmbienceListPage from "./ambiences/AmbienceListPage"
import CreateAmbience from "./ambiences/CreateAmbience"
import EditAmbience from "./ambiences/EditAmbience"
import ServerList from "./ServerList"

export default function App() {
  const playerState = usePlayerState()
  return (
    <div>
      <div className="app-content">
        <h1>🎵 Music Bot</h1>

        { playerState?.isConnected ?
          <Router>
            <Switch>
              <Route path="/playlist/new">
                <AddPlaylist />
              </Route>
              <Route path="/playlist/import">
                <ImportPlaylist />
              </Route>
              <Route path="/playlist/:id/edit">
                <EditPlaylist />
              </Route>
              <Route path="/playlist/:id/addSong">
                <AddSong />
              </Route>
              <Route path="/playlist/:id">
                <ViewPlaylist />
              </Route>
              <Route path="/ambience/new">
                <CreateAmbience />
              </Route>
              <Route path="/ambience">
                <AmbienceListPage />
              </Route>
              <Route path="/ambience/:id/edit">
                <EditAmbience />
              </Route>
              <Route path="/edit/:id">
                <EditSong />
              </Route>
              <Route path="/:id">
                <ViewSong />
              </Route>
              <Route path="/" exact>
                <HomePage />
              </Route>
            </Switch>
          </Router>
          : <ServerList />
        }
      </div>      
      <PlayerControl playerState={playerState} />
    </div>
  )
}
