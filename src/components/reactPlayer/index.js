import ReactPlayer from 'react-player'
import {Component} from 'react'
import ReactContext from '../../contextFolder/contextFile'
import './index.css'

class VideoPlayer extends Component {
  state = {isLiked: false, isUnLiked: false}

  render() {
    return (
      <ReactContext.Consumer>
        {value => {
          const {onclick} = value
          const {isLiked, isUnLiked} = this.state

          const {data} = this.props

          const {
            title,
            videoUrl,
            published,
            viewcount,
            channel,
            description,
          } = data
          const onclickk = () => {
            onclick(data)
          }

          const liked = () => {
            if (isUnLiked === false) {
              this.setState(pre => ({isLiked: !pre.isLiked}))
            } else {
              this.setState(pre => ({
                isLiked: !pre.isLiked,
                isUnLiked: !pre.isUnLiked,
              }))
            }
          }
          const Liked = isLiked ? 'like' : 'unlike'

          const unliked = () => {
            if (isLiked === false) {
              this.setState(pre => ({isUnLiked: !pre.isUnLiked}))
            } else {
              this.setState(pre => ({
                isLiked: !pre.isLiked,
                isUnLiked: !pre.isUnLiked,
              }))
            }
          }
          const unLiked = isUnLiked ? 'like' : 'unlike'
          console.log(Liked)
          const cha = {
            name: channel.name,
            subscribers: channel.subscriber_count,
            Url: channel.profile_image_url,
          }
          const {name, subscribers, Url} = cha
          const subscrib = `${subscribers} subscribers`

          console.log(description)
          const viewscont = `${viewcount} views`
          return (
            <div className="video-container">
              <div className="responsive-container">
                <ReactPlayer
                  url={videoUrl}
                  controls
                  width="750px"
                  height="320px"
                />
              </div>
              <p className="heading">{title}</p>

              <div className="react-bottom">
                <div className="p-content">
                  <p className="p-player">{viewscont}</p>
                  <p className="p-player">{published}</p>
                </div>
                <ul className="react-ul">
                  <li className="react-li">
                    <button
                      type="button"
                      className={`like-btn ${Liked}`}
                      onClick={liked}
                    >
                      like
                    </button>
                  </li>
                  <li className="react-li">
                    <button
                      type="button"
                      className={`like-btn ${unLiked}`}
                      onClick={unliked}
                    >
                      dislike
                    </button>
                  </li>
                  <li className="react-li">
                    <button onClick={onclickk} type="button">
                      Save
                    </button>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="player-bottom-cont">
                <div className="btm-cont">
                  <img
                    className="player-btm-img"
                    src={Url}
                    alt="channel logo"
                  />
                  <div className="btm-cont-content">
                    <p className="play-p">{name}</p>
                    <p className="play-p">{subscrib}</p>
                  </div>
                </div>
                <p className="play-p">{description}</p>
              </div>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}

export default VideoPlayer
