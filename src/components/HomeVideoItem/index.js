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
    <li className="video-card-item">
      <Link to={`/videos/${id}`}>
        <img
          className="thumbnail-img"
          src={thumbnailUrl}
          alt="video thumbnail"
        />
      </Link>
      <div className="card-content-cont">
        <img className="card-img" src={proImage} alt="channel logo" />
        <div className="card-content">
          <p className="video-h">{title}</p>
          <p className="video-p">{pro}</p>
          <div className="view-content">
            <p className="video-p">{`${viewcount} views`}</p>
            <p className="video-p">{dateis}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default VideoItem
