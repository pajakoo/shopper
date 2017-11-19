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
              console.log(accessToken)
              console.log('gg:', accessToken==='EAASyxrEWJTIBABOIDVCIxciTis7qtPPXQbLYxdnnnNOpICyjusmPuWZBrMIIXv5e6wr1Vr8RQm7VRZBDgcVA1xhc5UbaAzv8F8aOAudsA1CHz6DU3RtXEZBfw29XA9gLAZCtzZABG8wbmvtKXPY6mST5BiQozWLdt6KGk8mw5BwThUc3sqAawbU76Px8DJtyUN7pUz8kcuQZDZD')
              if (response && !response.error) {
                fetch(baseUrl + '/api/users', {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json','x-access-token': accessToken
                  },
                  method: "POST",
                  body: JSON.stringify({name: response.name, type: 'create_fb_user'})
                }).then((response) => response.json())
                  .then((data) => {
                    localStorage.setItem('token', data.token)
                    browserHistory.push('/users')
                  })
                  .catch((err) => {
                    console.log('fetf: ', err)
                  })

                /*getPromiseData(user).then( res => {
                  localStorage.setItem('token', res[0].token)
                  browserHistory.push('/users')
                })*/

              }
            }
          )
        }
        else {
          FB.login();
        }
      });
    });
  }

}

/**
 * Created by pajakoo on 3/2/17.
 */
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
        {fields: 'first_name, last_name, gender'},
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
