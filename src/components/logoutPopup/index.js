import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import './index.css'

const ReactPopUp = props => {
  const {data} = props

  const onclick = () => {
    data()
  }
  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button className="trigger-button" type="button">
            LogOut
          </button>
        }
        position="right center"
      >
        {close => (
          <div className="popup-cont">
            <p>Are you sure, you want to logout</p>
            <button
              type="button"
              className="triggerinsidebutton"
              onClick={() => close()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="triggerinsidebutton"
              onClick={onclick}
            >
              Confirm
            </button>
          </div>
        )}
      </Popup>
    </div>
  )
}
export default ReactPopUp
