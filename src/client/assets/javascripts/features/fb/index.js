import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
// https://github.com/kennetpostigo/react-facebook-login-component
export class FacebookLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: location.search.split("&")[0].replace("?", "").split("=")[1] || ''
    }
    this.checkLoginState = this.checkLoginState.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
  }

  componentDidMount() {
    if( this.state.code !== '' ){
      this.props.responseHandler(this.state.code)
    }
    (function (d, s, id) {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = () => {
      FB.init({
        appId: this.props.socialId,
        xfbml: this.props.xfbml,
        cookie: this.props.cookie,
        version: this.props.version,
      })
    }
  }

  responseApi (authResponse) {
    //window.location = 'https://www.facebook.com/v2.11/dialog/oauth?client_id=1322466351129906&redirect_uri=http://localhost:3000/login&response_type=code'

    //https://www.quora.com/How-does-Login-with-Facebook-option-work-on-third-party-websites   - DIAGRAM CODE FLOW
    FB.api('/me', { fields: this.props.fields }, (me) => {
       console.log('responseApi: ',me, authResponse )
      this.props.responseHandler({fbId:me.id, name:me.name, email:me.email, token:authResponse.accessToken})
    })

    /*fetch('https://www.facebook.com/v2.11/dialog/oauth?client_id=1322466351129906&redirect_uri=http://localhost:3000/&response_type=token', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "GET", mode: 'no-cors'}).
    then( (me) => {
      console.log('the code: ', me)
      //this.props.responseHandler(me)
    })*/
  }

  checkLoginState (response) {
    if (response.authResponse) {
      this.responseApi(response.authResponse)
    } else {
      if (this.props.responseHandler) {
        this.props.responseHandler({ status: response.status })
      }
    }
  }

  clickHandler () {
    FB.login(this.checkLoginState, { scope: this.props.scope })
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











/*

import React from 'react'
import {browserHistory} from 'react-router'
import {baseUrl, getPromiseData} from '../../utils/Utils'

export default class Login extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return <div>FB Login...</div>
  }
  componentDidMount() {
    new Promise((resolve, reject) => {
      if (typeof FB !== 'undefined') {
        resolve();
      } else {
        window.fbAsyncInit = () => {
          FB.init({
            appId      : '1322466351129906',
            xfbml      : true,
            version    : 'v2.8'
          });
          resolve();
        };
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
    }).then(function() {
      FB.getLoginStatus(function(response) {
        console.log('status:', response.status)
        if (response.status === 'connected') {
          let uid = response.authResponse.userID;
          let accessToken = response.authResponse.accessToken;
          // https://graph.facebook.com/oauth/client_code?access_token=...&client_secret=...&redirect_uri=...&client_id=...
          // fetch('https://graph.facebook.com/me?fields=id&access_token='+accessToken).then((res) => console.log(res.json()) );

          // This new long-lived access token will expire on January 16th, 2018:
          // EAASyxrEWJTIBAPJ65xpGe74hkzbwqE7mGC1V4UXG1Y6YPTVermRjgrhHD85IQH8xeMvbC4xuGFNng9cLMCzskzQ
          /!* make the API call *!/
          FB.api(
            "/"+uid,
            function (response) {
              if (response && !response.error) {
                fetch(baseUrl + '/api/users', {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json','x-access-token': accessToken
                  },
                  method: "POST",
                  body: JSON.stringify({name: response.name, type: 'fb_login'})
                }).then((response) => response.json())
                  .then((data) => {
                    localStorage.setItem('token', accessToken)
                    browserHistory.push('/users')
                  })
                  .catch((err) => {
                    console.log('fetf: ', err)
                  })

                /!*getPromiseData(user).then( res => {
                 localStorage.setItem('token', res[0].token)
                 browserHistory.push('/users')
                 })*!/

              }
            }
          )
        }
        else {
          FB.login(function (response) {
            if(response.status == 'connected'){
              console.log('FB: ',response)
              browserHistory.push('/login')
            } else {
              console.log('FB: ',response)
            }
          }) //then( () => browserHistory.push('/login'))
        }
      });
    });
  }

}

/!**
 * Created by pajakoo on 3/2/17.
 *!/
const promises = {
  init: () => {
    return new Promise((resolve, reject) => {
      if (typeof FB !== 'undefined') {
        resolve();
      } else {
        window.fbAsyncInit = () => {
          FB.init({
            appId      : '<app_id>',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.5'
          });
          resolve();
        };
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
    });
  },
  checkLoginState: () => {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((response) => {
        response.status === 'connected' ? resolve(response) : reject(response);
      });
    });
  },
  login: () => {
    return new Promise((resolve, reject) => {
      FB.login((response) => {
        response.status === 'connected' ? resolve(response) : reject(response);
      });
    });
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      FB.logout((response) => {
        response.authResponse ? resolve(response) : reject(response);
      });
    });
  },
  fetch: () => {
    return new Promise((resolve, reject) => {
      FB.api(
        '/me',
        {fields: 'first_name, last_name, gender, email'},
        response => response.error ? reject(response) : resolve(response)
      );
    });
  }
}

export const Facebook = {
  doLogin() {
    this.setState({
      loading: true
    }, () => {
      promises.init()
        .then(
          promises.checkLoginState,
          error => { throw error; }
        )
        .then(
          response => { this.setState({status: response.status}); },
          promises.login
        )
        .then(
          promises.fetch,
          error => { throw error; }
        )
        .then(
          response => { this.setState({loading: false, data: response, status: 'connected'}); },
          error => { throw error; }
        )
        .catch((error) => {
          this.setState({loading: false, data: {}, status: 'unknown'});
          console.warn(error);
        });
    });
  },
  doLogout() {
    this.setState({
      loading: true
    }, () => {
      promises.init()
        .then(
          promises.checkLoginState,
          error => { throw error; }
        )
        .then(
          promises.logout,
          error => { this.setState({data: {}, status: 'unknown'}); }
        )
        .then(
          response => { this.setState({loading: false, data: {}, status: 'unknown'}); },
          error => { throw error; }
        )
        .catch(error => {
          this.setState({loading: false, data: {}, status: 'unknown'});
          console.warn(error);
        });
    });
  },
  checkStatus() {
    this.setState({
      loading: true
    }, () => {
      promises.init()
        .then(
          promises.checkLoginState,
          error => { throw error; }
        )
        .then(
          response => { this.setState({status: response.status}); },
          error => { throw error; }
        )
        .then(
          promises.fetchUser,
          error => { throw error; }
        )
        .then(
          response => { this.setState({loading: false, data: response, status: 'connected'}); },
          error => { throw error; }
        )
        .catch((error) => {
          this.setState({loading: false, data: {}, status: 'unknown'});
          console.warn(error);
        });
    });
  }
};
*/
