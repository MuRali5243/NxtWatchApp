import Spinner from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import VideoItem from '../HomeVideoItem'
import HeaderFinal from '../HeaderFinal'
import HeaderTop from '../HeaderTop'
import Context from '../../contextFolder/contextFile'

import './index.css'

const imgurlFail =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
const imgurlnoResults =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png'

const obj = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  failure: 'failure',
}

class Home extends Component {
  state = {status: obj.initial, searchvalue: '', videoList: [], tot: 0}

  componentDidMount() {
    this.fetchProducts()
  }

  onchange = event => {
    this.setState({searchvalue: event.target.value})
  }

  fetchProducts = async () => {
    const {searchvalue} = this.state
    const search = searchvalue
    this.setState({status: obj.loading})
    const jwttoken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwttoken}`},
    }
    const url = `https://apis.ccbp.in/videos/all?search=${search}`
    const promise = await fetch(url, options)
    if (promise.ok) {
      const res = await promise.json()
      const {total} = res
      if (total !== 0) {
        const updata = res.videos.map(each => ({
          id: each.id,
          title: each.title,
          channel: each.channel,
          published: each.published_at,
          thumbnailUrl: each.thumbnail_url,
          viewcount: each.view_count,
        }))

        this.setState({
          status: obj.success,
          videoList: updata,
          searchvalue: '',
          tot: total,
        })
      } else {
        this.setState({
          status: obj.success,
          videoList: [],
          tot: total,
        })
      }
    } else {
      this.setState({status: obj.failure})
    }
  }

  successFunct = () => {
    const {videoList, tot} = this.state
    console.log(tot)

    if (tot !== 0) {
      return (
        <ul className="video-cont">
          {videoList.map(each => (
            <VideoItem key={each.id} det={each} />
          ))}
        </ul>
      )
    }
    return (
      <div className="fail-main-cont">
        <h1>No Search results found</h1>
        <img className="fail-img" src={imgurlnoResults} alt="no videos" />

        <p>Try different key words or remove search filter</p>
        <button type="button" onClick={this.fetchProducts}>
          Retry
        </button>
      </div>
    )
  }

  searchButton = () => {
    const element = document.getElementById('input-search')
    const val = element.value

    this.setState({searchvalue: val}, this.fetchProducts)
  }

  loading = () => (
    <div className="laoder" data-testid="loader">
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
    const {searchvalue} = this.state
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
            <div className="banner">
              <img
                className="banner-nxt"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="nxt watch logo"
              />
              <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
              <button data-testid="close" type="button" className="banner-btn">
                GET IT NOW
              </button>
            </div>
            <div>
              <div className="input-cont">
                <input
                  data-testid="searchButton"
                  onChange={this.onchange}
                  id="input-search"
                  className="input-search-cont"
                  value={searchvalue}
                  placeholder="Search"
                  type="search"
                />
                <div className="bs-cont">
                  <button onClick={this.searchButton}>
                    <BsSearch color="dark" size={25} />
                  </button>
                </div>
              </div>
            </div>
            <div className="res-cont">{this.switchstate()}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
