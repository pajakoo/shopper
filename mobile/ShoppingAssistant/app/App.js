import Home from './components/Home'
import Login from './components/Login'
import Map from './components/Map'
import Items from './components/Items'
import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import store from './store'

export default class App extends Component {

  render(){

    const ShoppingAssistant = StackNavigator({
      Home: { screen: Home },
      Login: { screen: Login },
      Map: { screen: Map },
      Items: { screen: Items }
    }, {
      headerMode: 'none',
    })

    return (
      <Provider store={store}>
        <ShoppingAssistant />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('ShoppingAssistant', () => App)
