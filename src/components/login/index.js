import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const loginimg =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

class Login extends Component {
  state = {password: '', username: '', isLogin: false}

  userchange = event => {
    this.setState({username: event.target.value})
  }

  pwdchange = event => {
    this.setState({password: event.target.value})
  }

  fetchUsername = () => {
    const {username} = this.state
    console.log(username)
    return (
      <>
        <input
          type="text"
          id="Username"
          value={username}
          placeholder="username"
          onChange={this.userchange}
        />
      </>
    )
  }

  fetchPassword = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="Password">PASSWORD</label> <br />
        <input
          type="password"
          id="Password"
          value={password}
          placeholder="password"
          onChange={this.pwdchange}
        />
        <input className="show-password" type="checkbox" />
        <label htmlFor="Password">Show password</label> <br />
      </>
    )
  }

  submitSuccess = async promise => {
    const res = await promise.json()
    const jwttoken = res.jwt_token
    console.log(res.jwttoken)
    Cookies.set('jwt_token', jwttoken, {expires: 10})
    const {history} = this.props
    history.push('/')
  }

  failedcase = () => {
    this.setState(pre => ({isLogin: !pre.isLogin}))
  }

  onsubmit = async event => {
    console.log('ss')
    event.preventDefault()
    const {username, password} = this.state
    const det = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(det),
    }
    const promise = await fetch(url, options)
    console.log(promise)
    if (promise.ok === true) {
      this.submitSuccess(promise)
    } else {
      this.failedcase()
    }
  }

  render() {
    const {isLogin} = this.state
    return (
      <div className="login-cont">
        <div className="login-content-cont">
          <form onSubmit={this.onsubmit}>
            <img className="login-img" alt="profile" src={loginimg} />
            <div className="user-cont">{this.fetchUsername()}</div>
            <div className="pwd-cont">{this.fetchPassword()}</div>
            <button type="submit" className="login-btn">
              Login
            </button>
            <div>
              {isLogin ? (
                <p className="login-cred">Username and Pasword didn't match</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
