import ReactContext from '../../contextFolder/contextFile'
import HomeVideoItem from '../HomeVideoItem'
import HeaderFinal from '../HeaderFinal'
import HeaderTop from '../HeaderTop'

const imgurlNoSaved =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png'

const SavedVideos = () => (
  <ReactContext.Consumer>
    {value => {
      console.log('value')
      const {List} = value
      console.log(List)
      const l = List.length
      if (l > 0) {
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
                {List.map(each => (
                  <HomeVideoItem det={each} key={each.id} />
                ))}
              </div>
            </div>
          </div>
        )
      }
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
              <div className="fail-main-cont">
                <img className="fail-img" src={imgurlNoSaved} />
                <h1>No saved videos found </h1>
                <p>You can save your videos while watching them.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  </ReactContext.Consumer>
)
export default SavedVideos
