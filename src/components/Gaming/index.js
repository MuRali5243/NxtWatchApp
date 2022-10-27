import Spinner from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import GameItem from '../GamecardItem'
import HeaderFinal from '../HeaderFinal'
import HeaderTop from '../HeaderTop'

import './index.css'

const obj = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  failure: 'failure',
}

class Game extends Component {
  state = {status: obj.initial, searchvalue: '', GameList: []}

  componentDidMount() {
    this.fetchProducts()
  }

  onchange = event => {
    this.setState({searchvalue: event.target.value}, this.fetchProducts)
    console.log(event.target.value)
  }

  fetchProducts = async () => {
    this.setState({status: obj.loading})
    const jwttoken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwttoken}`},
    }
    const url = 'https://apis.ccbp.in/videos/gaming'
    const promise = await fetch(url, options)

    if (promise.ok) {
      const res = await promise.json()
      console.log(res)
      const updata = res.videos.map(each => ({
        id: each.id,

        title: each.title,

        thumbnailUrl: each.thumbnail_url,
        viewcount: each.view_count,
      }))
      console.log(updata)
      console.log('games')

      this.setState({status: obj.success, GameList: updata})
    }
  }

  successFunct = () => {
    const {GameList} = this.state
    return (
      <div className="video-cont">
        {GameList.map(each => (
          <GameItem id={each.id} det={each} />
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
export default Game
