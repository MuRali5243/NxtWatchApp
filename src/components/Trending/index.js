import Spinner from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import VideoItem from '../trendVideoItem'
import HeaderFinal from '../HeaderFinal'
import HeaderTop from '../HeaderTop'

import './index.css'

const imgurlFail =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

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
    } else {
      this.setState({status: obj.failure})
    }
  }

  successFunct = () => {
    const {TrendingList} = this.state
    console.log('trending')
    return (
      <div className="trend-cont">
        <div>
          {' '}
          <h1>Trending</h1>
        </div>
        {TrendingList.map(each => (
          <VideoItem key={each.id} det={each} />
        ))}
      </div>
    )
  }

  loading = () => (
    <div>
      <Spinner type="TailSpin" width={40} height={40} />
    </div>
  )

  failureFunct = () => (
    <div className="fail-main-cont">
      <img className="fail-img" src={imgurlFail} alt="failure view" />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble to complete your request.</p>
      <p>Please try again</p>
      <button type="button" onClick={this.fetchProducts}>
        Retry
      </button>
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
