import {Link} from 'react-router-dom'
import './index.css'

const GameItem = props => {
  const {det} = props
  const {id, title, thumbnailUrl, viewcount} = det

  return (
    <div className="video-card">
      <Link to={`/details/${id}`}>
        <img className="thumbnail-img1" src={thumbnailUrl} alt="img" />
        <h1 className="video-h">{title}</h1>

        <p className="video-p">{viewcount}</p>
      </Link>
    </div>
  )
}
export default GameItem
