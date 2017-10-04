import Home from './components/Home'
import Map from './components/Map'
import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'

const ShoppingAssistant = StackNavigator({
  Home: { screen: Home },
  Map: { screen: Map }
})

AppRegistry.registerComponent('ShoppingAssistant', () => ShoppingAssistant)
