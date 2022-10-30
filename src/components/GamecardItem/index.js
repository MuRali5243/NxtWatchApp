import {Link} from 'react-router-dom'
import './index.css'

const GameItem = props => {
  const {det} = props
  const {id, title, thumbnailUrl, viewcount} = det

  return (
    <div className="video-card">
      <Link to={`/videos/${id}`}>
        <img
          className="thumbnail-img1"
          src={thumbnailUrl}
          alt="video thumbnai"
        />
        <p className="game-h">{title}</p>

        <div className="game-card-content">
          <p className="game-p">{viewcount}</p>{' '}
          <p className="game-p">Watching World Wide</p>
        </div>
      </Link>
    </div>
  )
}
export default GameItem
