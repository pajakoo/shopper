/**
 * Created by pajakoo on 2/24/17.
 */
var api = {

  //baseUrl: 'https://10.10.0.119:55555',
  baseUrl: 'https://shopper.openode.io',
  //baseUrl: 'http://10.10.0.119:8080',
  //baseUrl: 'http://87.126.166.28:8080',
  //baseUrl: 'http://192.168.0.2:8080',

  getPromiseData: function( x ){
    return new Promise((resolve, reject) => {
      Promise.all(x)
        .then(res => {
          return res.map(data => data.json())
        })
        .then(res => {
          Promise.all(res).then(resolve)
        }).catch(reject)
    })
  }
}
module.exports = api

//Users/pajakoo/WebstormProjects/ShoppingAssistant/mobile/ShoppingAssistant/node_modules/react-native-material-ui/src/styles/themes/cyan.js
