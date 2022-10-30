import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import './index.css'

const VideoItem = props => {
  const {det} = props
  const {id, title, published, thumbnailUrl, viewcount, channel} = det
  const pro = channel.name
  const proImage = channel.profile_image_url
  const dateis = formatDistanceToNow(new Date(published))

  return (
    <li className="trend-card-item">
      <Link to={`/videos/${id}`}>
        <img
          className="thumbnail-img"
          src={thumbnailUrl}
          alt="video thumbnail"
        />
      </Link>
      <div className="trend-card-content">
        <p className="trend-h">{title}</p>
        <p className="trend-p">{pro}</p>
        <div className="view-content">
          <p className="trend-p">{`${viewcount} views`}</p>
          <p className="trend-p">{dateis}</p>
        </div>
      </div>
    </li>
  )
}
export default VideoItem
