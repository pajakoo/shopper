import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import {browserHistory} from 'react-router'
import { FacebookLogin } from '../../features/fb/index'
import {baseUrl} from '../../utils/Utils'
import * as firebase from 'firebase'

export default class Login extends Component {

  state = {
    userEmail: '',
    userPassword: '',
    open: false,
    fireBaseTest:0,
    messages:{
      modalOpen:false,
      message:'',
      action:'',
      autoHideDuration:4000
    }
  }

  componentDidMount(){

    let config = {
      apiKey: "AIzaSyBYcnxnIrA5g4CttyTHvkabia2zaLnG6so",
      authDomain: "shopper-cd078.firebaseapp.com",
      databaseURL: "https://shopper-cd078.firebaseio.com",
      projectId: "shopper-cd078",
      storageBucket: "shopper-cd078.appspot.com",
      messagingSenderId: "414753763111"
    }
    firebase.initializeApp(config)

    const rootRef = firebase.database().ref().child('object')
    rootRef.on('value', (snap) => {
      this.setState({
        'fireBaseTest': snap.val()
      })
      console.log('here you go: ', this.state.fireBaseTest)
    })

  }

  handleOpen = () => {
    //this.setState({open: true})
  }

  handleClose = () => {

    if (!this.state.userEmail || !this.state.userPassword) {
      let messages = {...this.state.messages}
      messages.modalOpen = true
      messages.message = 'Fill all the fields'

      this.setState({messages})
        return
    }

    var ctx = this
    firebase.auth().signInWithEmailAndPassword(this.state.userEmail, this.state.userPassword)
      .then((res) => {
        console.log('Logged: ',res)

        let param = {
          fbId: res.fbId,
          name: res.name,
          email: res.email,
          type: 'email_login'
        }
        this.responseFacebook(param)
        browserHistory.push('/users')
      })
      .catch(function(error) {
        if(error.code != ''){
          let messages = {...ctx.state.messages}
          messages.modalOpen = true
          messages.message = error.code + ': '+ error.message
          ctx.setState({messages})
        }
    })

    /*firebase.auth().createUserWithEmailAndPassword(this.state.userEmail, this.state.userPassword).catch(function(error) {
      var errorCode = error.code
      var errorMessage = error.message

      if (errorCode == 'auth/weak-password') {
        console.log('The password is too weak.')
      } else {
        console.log(errorMessage)
      }

    })*/

    // this.setState({open: false})
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
        {/*<RaisedButton label="Dialog" onTouchTap={this.handleOpen} />*/}
        <Dialog
          ignoreBackdropClick={true}
          title="Shopper APP"
          overlayStyle={{backgroundColor:'white'}}
          titleStyle={{textAlign: 'center',color:'grey' }}/*backgroundColor:'#00BCD4'*/
          actions={actions}
          modal={false}
          open={true}
          // open={this.state.open}
          onRequestClose={() => {}}
        >
          <TextField
            onChange={ ( e ) => this.setState({'userEmail': e.target.value}) }
            hintText="Enter е-mail address"
            fullWidth={true}
            floatingLabelText="E-mail address"
          />
          <TextField
            onChange={ ( e ) => this.setState({'userPassword': e.target.value}) }
            type="password"
            hintText="Enter password"
            fullWidth={true}
            floatingLabelText="Password"
          />

        </Dialog>
        <Snackbar
          open={this.state.messages.modalOpen}
          message={this.state.messages.message}
          action="error"
          autoHideDuration={this.state.messages.autoHideDuration}
        />
      </div>
    )
  }
}
