import {Link} from 'react-router-dom'
import Context from '../../contextFolder/contextFile'
import './index.css'

const fb =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png'
const tw =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png'
const ln =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png'

const HeaderFinal = () => (
  <Context.Consumer>
    {value => {
      const {isDarkTheme} = value
      const classnameColor = isDarkTheme ? 'darkColor' : 'whiteColor'

      return (
        <div className={`home-cont ${classnameColor}`}>
          <div>
            <ul className="home-side-nav-cont">
              <Link to="/">
                <li className="link">Home</li>
              </Link>
              <Link to="/trending">
                <li className="link">Trending</li>
              </Link>
              <Link to="/gaming">
                <li className="link">Gaming</li>
              </Link>
              <Link to="/saved-videos">
                <li className="link">Saved Videos</li>
              </Link>
            </ul>
          </div>

          <div className="head-bottom">
            <p>CONTACT US</p>
            <div className="head-icons">
              <img className="icon" src={fb} alt="facebook logo" />
              <img className="icon" src={tw} alt="twitter logo" />
              <img className="icon" src={ln} alt="linked in logo" />
            </div>
            <p className="p-side-bottom-header">
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </Context.Consumer>
)
export default HeaderFinal
