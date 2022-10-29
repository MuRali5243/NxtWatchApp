import {withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import Context from '../../contextFolder/contextFile'
import './index.css'

const darkimg =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

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
      return (
        <nav className="nav-cont">
          <img className="header-icon-img" src={darkimg} alt="img" />
          <ul className="nav-ul-cont">
            <button className="theme-btn" onClick={onclickThem}>
              <img className="header-left-img1" src={theme} alt="img" />
            </button>
            <img className="header-left-img2" src={profileimg} alt="img" />
            <button
              className="header-btn"
              type="button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </ul>
        </nav>
      )
    }}
  </Context.Consumer>
)

export default withRouter(HeaderTop)
