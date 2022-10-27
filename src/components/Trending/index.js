import Spinner from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import VideoItem from '../HomeVideoItem'
import HeaderFinal from '../HeaderFinal'
import HeaderTop from '../HeaderTop'

import './index.css'

const obj = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  failure: 'failure',
}

class Trend extends Component {
  state = {status: obj.initial, TrendingList: []}

  componentDidMount() {
    this.fetchProducts()
  }

  fetchProducts = async () => {
    this.setState({status: obj.loading})
    const jwttoken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwttoken}`},
    }
    const url = 'https://apis.ccbp.in/videos/trending'
    const promise = await fetch(url, options)
    console.log(promise)

    if (promise.ok) {
      const res = await promise.json()
      console.log(res)
      const updata = res.videos.map(each => ({
        id: each.id,
        channel: each.channel,
        title: each.title,
        published: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        viewcount: each.view_count,
      }))
      console.log(updata)
      console.log('trends')

      this.setState({status: obj.success, TrendingList: updata})
    }
  }

  successFunct = () => {
    const {TrendingList} = this.state
    console.log('trending')
    return (
      <div className="video-cont">
        {TrendingList.map(each => (
          <VideoItem id={each.id} det={each} />
        ))}
      </div>
    )
  }

  loading = () => (
    <div>
      <Spinner type="TailSpin" width={40} height={40} />
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
    const {status} = this.state
    console.log(status)
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
export default Trend
