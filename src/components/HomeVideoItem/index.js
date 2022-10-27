import {Link} from 'react-router-dom'
import './index.css'

const VideoItem = props => {
  const {det} = props
  const {id, title, published, thumbnailUrl, viewcount} = det
  console.log('rendingvideo')

  return (
    <li className="video-card-item">
      <Link to={`/details/${id}`}>
        <img className="thumbnail-img" src={thumbnailUrl} alt="img" />
      </Link>
      <h1 className="video-h">{title}</h1>
      <div className="view-content">
        <p className="video-p">{viewcount}</p>
        <p className="video-p">{published}</p>
      </div>
    </li>
  )
}
export default VideoItem
