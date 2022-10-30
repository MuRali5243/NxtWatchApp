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
import NotFound from './components/NotFound'

class App extends Component {
  state = {List: [], isDarkTheme: true}

  onclick = newObj => {
    this.setState(pre => ({List: [...pre.List, newObj]}))
  }

  onclickTheme = () => {
    this.setState(each => ({isDarkTheme: !each.isDarkTheme}))
  }

  render() {
    const {List, isDarkTheme} = this.state
    console.log(List)
    return (
      <div>
        <ReactContext.Provider
          value={{
            List,
            isDarkTheme,
            onclick: this.onclick,
            onclickTheme: this.onclickTheme,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/trending" component={Trend} />
            <ProtectedRoute exact path="/trail" component={Trail} />
            <ProtectedRoute exact path="/gaming" component={Game} />
            <ProtectedRoute exact path="/videos/:id" component={VideoDet} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <Route component={NotFound} />
          </Switch>
        </ReactContext.Provider>
      </div>
    )
  }
}
export default App
