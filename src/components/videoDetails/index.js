import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactPlayer from '../reactPlayer'
import HeaderFinal from '../HeaderFinal'
import HeaderTop from '../HeaderTop'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const imgurlFail =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

const obj = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  failure: 'failure',
}

class VideoDetails extends Component {
  state = {videoObj: {}, isLoading: true}

  componentDidMount() {
    this.videoDetails()
  }

  videoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({status: obj.loading})
    const jwttoken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwttoken}`},
    }

    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options)
    if (response.ok) {
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
      this.setState({status: obj.success, videoObj})
    } else {
      this.setState({status: obj.failure})
    }
  }

  successFunct = () => {
    const {videoObj} = this.state
    return (
      <div className="player-cont">
        <ReactPlayer data={videoObj} id={videoObj.id} />
      </div>
    )
  }

  loading = () => (
    <div data-testid="loader" className="laoder">
      <Loader type="TailSpin" width={40} height={40} />
    </div>
  )

  failureFunct = () => (
    <div className="fail-main-cont">
      <img className="fail-img" src={imgurlFail} alt="img" />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble to complete your request.</p>
      <p>Please try again</p>
      <button type="button">Retry</button>
    </div>
  )

  switchstate = () => {
    const {status} = this.state
    switch (status) {
      case 'loading':
        return this.loading()
      case 'success':
        return this.successFunct()
      case 'failure':
        return this.failureFunct()

      default:
        return null
    }
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
            <div className="res-cont">{this.switchstate()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoDetails
