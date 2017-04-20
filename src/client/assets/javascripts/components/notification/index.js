import React from 'react'
import Notification from 'react-web-notification';

class Notifyier extends Component {

  render() {
    return (
      <div>
        <button onClick={this.handleButtonClick.bind(this)}>Notif!</button>
        <Notification
          ignore={this.state.ignore && this.state.title !== ''}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          onShow={this.handleNotificationOnShow.bind(this)}
          onClick={this.handleNotificationOnClick.bind(this)}
          onClose={this.handleNotificationOnClose.bind(this)}
          onError={this.handleNotificationOnError.bind(this)}
          timeout={5000}
          title={this.state.title}
          options={this.state.options}
        />
        <audio id='sound' preload='auto'>
          <source src='./sound.mp3' type='audio/mpeg' />
          <source src='./sound.ogg' type='audio/ogg' />
          <embed hidden='true' autostart='false' loop='false' src='./sound.mp3' />
        </audio>
      </div>
    )
  }
}
