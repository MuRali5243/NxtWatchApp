import './index.css'
import {withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'

const darkimg =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

const profileimg =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png'

const HeaderTop = props => {
  const onClickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-cont">
      <img className="header-icon-img" src={darkimg} alt="img" />
      <ul className="nav-ul-cont">
        <img className="header-left-img1" src={profileimg} alt="img" />
        <img className="header-left-img2" src={profileimg} alt="img" />
        <button className="header-btn" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </ul>
    </nav>
  )
}

export default withRouter(HeaderTop)
