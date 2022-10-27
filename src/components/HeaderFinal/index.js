import {Link} from 'react-router-dom'
import './index.css'

const fb =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png'
const tw =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png'
const ln =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png'

const HeaderFinal = () => (
  <div className="home-cont">
    <ul className="home-side-nav-cont">
      <Link to="/">
        {' '}
        <li className="link">Home</li>
      </Link>
      <Link to="trend">
        <li className="link">Trending</li>
      </Link>
      <Link to="/game">
        <li className="link">Gaming</li>
      </Link>
      <Link to="/save">
        <li className="link">SavedVideos</li>
      </Link>
    </ul>

    <div className="head-bottom">
      <h1>Contact us</h1>
      <div className="head-icons">
        <img className="icon" src={fb} alt="facebook logo" />
        <img className="icon" src={tw} alt="twitter logo" />
        <img className="icon" src={fb} alt="linked in logo" />
      </div>
      <p>Enjoy!Now to see your channels and recommendations!</p>
    </div>
  </div>
)
export default HeaderFinal
