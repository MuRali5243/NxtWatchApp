import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/login'
import Trail from './components/Trail'
import Home from './components/Home'
import Trend from './components/Trending'
import Game from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoDet from './components/videoDetails'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import ReactContext from './contextFolder/contextFile'

class App extends Component {
  state = {List: []}

  onclick = newObj => {
    this.setState(pre => ({List: [...pre.List, newObj]}))
  }

  render() {
    const {List} = this.state
    console.log(List)
    return (
      <div>
        <ReactContext.Provider value={{List, onclick: this.onclick}}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/trend" component={Trend} />
            <ProtectedRoute exact path="/trail" component={Trail} />
            <ProtectedRoute exact path="/game" component={Game} />
            <ProtectedRoute exact path="/details/:id" component={VideoDet} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/save" component={SavedVideos} />
          </Switch>
        </ReactContext.Provider>
      </div>
    )
  }
}
export default App
