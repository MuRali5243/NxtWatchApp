import {withRouter, Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import Context from '../../contextFolder/contextFile'
import Logout from '../logoutPopup'
import './index.css'

const darkimg =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

const profileimg =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png'

const lightTheme =
  'https://assets.ccbp.in/frontend/react-js/light-theme-img.png'

const darkTheme = 'https://assets.ccbp.in/frontend/react-js/dark-theme-img.png'

const HeaderTop = props => (
  <Context.Consumer>
    {value => {
      const {isDarkTheme, onclickTheme} = value

      const onclickThem = () => {
        onclickTheme()
      }

      const onClickLogout = () => {
        Cookie.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }
      const theme = isDarkTheme ? lightTheme : darkTheme
      const classnameColor = isDarkTheme ? 'darkColor' : 'whiteColor'
      return (
        <nav className={`nav-cont ${classnameColor}`}>
          <Link to="/">
            <img className="header-icon-img" src={darkimg} alt="website logo" />
          </Link>
          <ul className="nav-ul-cont">
            <button
              data-testid="theme"
              className="theme-btn"
              onClick={onclickThem}
            >
              <img className="header-left-img1" src={theme} alt="img" />
            </button>
            <img className="header-left-img2" src={profileimg} alt="profile" />
            <Logout data={onClickLogout} />
          </ul>
        </nav>
      )
    }}
  </Context.Consumer>
)

export default withRouter(HeaderTop)
