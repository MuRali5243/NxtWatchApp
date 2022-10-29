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
      <Link to={`/details/${id}`}>
        <img className="thumbnail-img" src={thumbnailUrl} alt="img" />
      </Link>
      <h1 className="video-h">{title}</h1>
      <p>{pro}</p>
      <div className="view-content">
        <p className="video-p">{`${viewcount} views`}</p>
        <p className="video-p">{dateis}</p>
      </div>
    </li>
  )
}
export default VideoItem
