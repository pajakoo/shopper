import Home from './components/Home'
import Map from './components/Map'
import Items from './components/Items'
import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'

const ShoppingAssistant = StackNavigator({
  Home: { screen: Home },
  Map: { screen: Map },
  Items: { screen: Items }
})

AppRegistry.registerComponent('ShoppingAssistant', () => ShoppingAssistant)
