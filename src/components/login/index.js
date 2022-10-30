import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

const loginimg =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

class Login extends Component {
  state = {password: '', username: '', isLogin: false, mssg: '', type: true}

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
        <label htmlFor="Username">USERNAME</label> <br />
        <input
          type="text"
          id="Username"
          value={username}
          placeholder="Username"
          onChange={this.userchange}
          className="pwd-user-input"
        />
      </>
    )
  }

  typeFunct = () => {
    this.setState(pre => ({type: !pre.type}))
  }

  fetchPassword = () => {
    const {password, type} = this.state
    const pwd = type ? 'password' : 'text'

    return (
      <>
        <label htmlFor="Password">PASSWORD</label> <br />
        <input
          type={pwd}
          id="Password"
          value={password}
          placeholder="Password"
          onChange={this.pwdchange}
          className="pwd-user-input"
        />
      </>
    )
  }

  ShowPassword = () => {
    const {password} = this.state
    return (
      <div className="show-pwd-cont">
        <input
          id="show"
          className="show-password"
          onClick={this.typeFunct}
          type="checkbox"
        />
        <label htmlFor="show">Show Password</label>
      </div>
    )
  }

  submitSuccess = async promise => {
    const res = await promise.json()
    const jwttoken = res.jwt_token
    console.log(res.jwttoken)
    Cookies.set('jwt_token', jwttoken, {expires: 10})
    const {history} = this.props
    history.replace('/')
  }

  failedcase = msg => {
    this.setState(pre => ({isLogin: !pre.isLogin, mssg: msg}))
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
      const pro = await promise.json()
      const msg = pro.error_msg
      console.log(msg)
      this.failedcase(msg)
    }
  }

  render() {
    const {isLogin, mssg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-cont">
        <div className="login-content-cont">
          <form onSubmit={this.onsubmit}>
            <img className="login-img" alt="website logo" src={loginimg} />
            <div className="user-cont">{this.fetchUsername()}</div>
            <div className="pwd-cont">{this.fetchPassword()}</div>
            <div className="show-pwd-cont">{this.ShowPassword()}</div>
            <button type="submit" className="login-btn">
              Login
            </button>
            <div>{isLogin && <p className="login-cred">{mssg}</p>}</div>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
