import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import {browserHistory} from 'react-router'
import { FacebookLogin } from '../../features/fb/index'
import {baseUrl} from '../../utils/Utils'

export default class Login extends Component {

  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  responseFacebook (response) {
     console.log('responseFacebook:', response)

    fetch(baseUrl + '/api/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json','x-access-token': response.token
      },
      method: "POST",
      body: JSON.stringify({
        fbId: response.fbId,
        name: response.name,
        email: response.email,
        type: 'fb_login'
      })
    }).then((response) => response.json())
      .then((data) => {
        localStorage.setItem('token', response.token)
        browserHistory.push('/users')
      })
      .catch((err) => {
        console.log('fetf: ', err)
      })

    //anything else you want to do(save to localStorage)...
  }

  render() {

    const actions = [
      <FlatButton
        style={{'width':'100%'}}
        label="LOGIN"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FacebookLogin socialId="1322466351129906"
                     language="en_US"
                     scope="public_profile,email"
                     responseHandler={this.responseFacebook}
                     xfbml={true}
                     fields="id,email,name"
                     version="v2.5"
                     style={{'width':'100%', backgroundColor:'#3b5998', color:'white'}}
                     label="Facebook LOGIN"
                     primary={true}
                     icon={<FontIcon className="fa fa-facebook" />}
                     onTouchTap={this.handleClose}

      />,
      <FlatButton
        style={{'width':'50%'}}
        label="Sign UP"
        primary={false}
        // keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        style={{'width':'50%'}}
        label="FORGOTTEN PASSWORD"
        primary={false}
        onTouchTap={this.handleClose}
      />
    ]

    return (
      <div>
        <RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          ignoreBackdropClick={true}
          title="Shopper APP"
          overlayStyle={{backgroundColor:'white'}}
          titleStyle={{textAlign: 'center',color:'grey' }}/*backgroundColor:'#00BCD4'*/
          actions={actions}
          modal={false}
          open={true}
          // open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText="Enter е-mail address"
            fullWidth={true}
            floatingLabelText="E-mail address"
          />
          <TextField
            type="password"
            hintText="Enter password"
            fullWidth={true}
            floatingLabelText="Password"
          />

        </Dialog>
      </div>
    )
  }
}



/*

<FlatButton
  style={{'width':'100%', backgroundColor:'#3b5998', color:'white'}}
  label="Facebook LOGIN"
  primary={true}
  icon={<FontIcon className="fa fa-facebook" />}
  onTouchTap={this.handleClose}
  onClick={ () => browserHistory.push('/fb-login') }
/>,*/
