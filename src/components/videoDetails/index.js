import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactPlayer from '../reactPlayer'
import HeaderFinal from '../HeaderFinal'
import HeaderTop from '../HeaderTop'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class VideoDetails extends Component {
  state = {videoObj: {}, isLoading: true}

  componentDidMount() {
    this.videoDetails()
  }

  videoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwttoken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwttoken}`},
    }

    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options)
    const data = await response.json()

    const d = data.video_details

    const videoObj = {
      id: d.id,
      title: d.title,
      published: d.published_at,
      thumbnailUrl: d.thumbnail_url,
      viewcount: d.view_count,
      videoUrl: d.video_url,
      description: d.description,

      channel: d.channel,
    }
    console.log(videoObj)
    this.setState({isLoading: false, videoObj})
  }

  renderBlogItemDetails = () => {
    const {videoObj} = this.state
    return (
      <div className="player-cont">
        <ReactPlayer data={videoObj} id={videoObj.id} />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-main-cont">
        <div className="main-top-cont">
          <HeaderTop />
        </div>

        <div className="main-body-cont">
          <div className="body-side-cont">
            <HeaderFinal />
          </div>
          <div className="body-middle-cont">
            {isLoading ? (
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            ) : (
              this.renderBlogItemDetails()
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default VideoDetails
