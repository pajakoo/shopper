import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import * as firebase from 'firebase'

export class FacebookLogin extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  clickHandler () {

    //https://codeburst.io/running-local-development-server-on-https-c3f80197ac4f  -  https on localhost

    var provider = new firebase.auth.FacebookAuthProvider()

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken
      // The signed-in user info.
      var user = result.user
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      // The email of the user's account used.
      var email = error.email
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential
    })
  }

  render() {
    const {
      socialId, xfbml, cookie, version, language, fields, responseHandler,
      children, buttonText, ...props
    } = this.props

    return (
      <FlatButton
        {...props}
        onClick={this.clickHandler} >
      </FlatButton>
    )
  }
}
