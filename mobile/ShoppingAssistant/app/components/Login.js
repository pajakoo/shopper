import React, { Component } from 'react'
import {View, AsyncStorage} from 'react-native'
import {ThemeProvider, Button} from 'react-native-material-ui'
import cyanTheme from 'react-native-material-ui/src/styles/themes/cyan'
import { TextField } from 'react-native-material-textfield'
import { LoginManager,AccessToken } from 'react-native-fbsdk'
import {baseUrl} from '../Utils'
import connect from 'react-redux'
import {login} from '../actions'

class Login extends Component {

  // https://github.com/drudge/passport-facebook-token
  static navigationOptions = {
    title: 'LoginScreen',
  }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
  }

  handleFacebookLogin () {

    const { navigate } = this.props.navigation

    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          console.log('Login success with permissions: ' + result.grantedPermissions.toString())
          AccessToken.getCurrentAccessToken().then((data) => {
            const { accessToken } = data
            fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
              .then((response) => response.json())
              .then((json) => {
                console.log("gg: ",json.email,json.name,json.id)

                fetch(baseUrl + '/api/users', {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json','x-access-token': accessToken
                  },
                  method: "POST",
                  body: JSON.stringify({
                    fbId: json.id,
                    name: json.name,
                    email: json.email,
                    type: 'fb_login'
                  })
                }).then((response) => response.json())
                  .then((data) => {
                    //this.props.userActions.login(true)
                    // localStorage.setItem('token', accessToken)
                    // browserHistory.push('/users')
                    AsyncStorage.setItem("token", accessToken)
                    navigate('Home')
                  })
                  .catch((err) => {
                    console.log('fetf: ', err)
                  })
              })
              .catch(() => {
                console.log('ERROR GETTING DATA FROM FACEBOOK')
              })
            // ctx.initUser(accessToken)
            //navigate('Items',{listId: res._id })

          })
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      }
    )
  }
  render () {

    return (
      <ThemeProvider uiTheme={cyanTheme}>
        <View style={{flex:1,padding:15}}>
          <TextField
            label={"Email address"}
            value={this.state.username}
            /*baseColor="red"
            textColor="green"
            tintColor="pink"*/
            onChangeText={ (username) => {
              this.setState({username})
            }}
          />
          <TextField
            secureTextEntry={true}
            label={"Password"}
            value={this.state.password}
            onChangeText={ (password) => {
              this.setState({password})
            }}
            style={{color:'black'}}
          />
            <Button
              primary
              text="Login"
              onPress={() => {
                this.handleFacebookLogin()
                //navigate('Home')
              }}
              style={{'width': '100%', backgroundColor: '#3b5998', color: 'white'}}
            />
            <Button
              primary
              text="Continue with Facebook"
              onPress={this.handleFacebookLogin}
              style={{container: {backgroundColor: '#3b5998'}, text: {color: 'white'}}}
            />
          <View style={{flexDirection: 'row'}}>

          <Button
              style={{container: {flex: 0.5}, text: {color: 'black'}}}
              text="Sign UP"
              primary={false}
              onPress={() => console.log('Sign UP') }
            />
            <Button
              style={{container: {flex: 0.5}, text: {color: 'black'}}}
              text="Forgotten password"
              primary={false}
              onPress={() => console.log('Forgotten password') }
            />
          </View>
        </View>
      </ThemeProvider>
    )
  }
}

export default Login
