import React, {Component} from 'react'
import {View, ScrollView, ToastAndroid, Platform, Text} from 'react-native'
import {ThemeProvider, ListItem, Button, Toolbar} from 'react-native-material-ui'
import DrawerLayout from 'react-native-drawer-layout-polyfill'
import cyanTheme from 'react-native-material-ui/src/styles/themes/cyan'
import {baseUrl} from '../Utils'

export default class Home extends Component {

  static navigationOptions = {
    title: 'HomeScreen',
  }

  constructor(props) {
    super(props)
    this.state = {
      selected: '',
      lists: [],
      status: 'unknown',
      loading: false,
      data: {},
      users: []
    }

    this.openDrawer = this.openDrawer.bind(this)
  }

  openDrawer() {
    this.drawer.openDrawer()
  }

  closeDrawer() {
    this.drawer.closeDrawer()
  }

  getPromiseData(x) {
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

  componentDidMount() {

    let users = [fetch(baseUrl+'/api/users').catch((err) => console.log('fetf: ', err))]
    this.getPromiseData(users).then(res => {
      this.setState({users: res.reduce((a, b) => [...a, ...b], [])})
    })
    this.loadLists()

  }

  loadLists() {
    let lists = [fetch(baseUrl+'/api/lists').catch((err) => console.log('fetf: ', err))]
    this.getPromiseData(lists).then(res => {
      this.setState({lists: res.reduce((a, b) => [...a, ...b], [])})
    })
  }

  render() {
    const { navigate } = this.props.navigation

    let navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {
          this.state.lists.map(function (res, i) {
            return (<ListItem
              divider
              leftElement="shop"
              centerElement={{
                primaryText: res.title,
              }}
              onPress={() => {
              }}
              key={i}/>)
          })
        }
      </View>
    )

    return (
      <ThemeProvider uiTheme={cyanTheme}>
        <DrawerLayout
          ref={(drawer) => this.drawer = drawer }
          drawerWidth={300}
          drawerPosition={DrawerLayout.positions.Left}
          renderNavigationView={() => navigationView}>
          <View >
            <Toolbar
              leftElement="menu"
              onLeftElementPress={this.openDrawer}
              onRightElementPress={(target) => {
                if(target.index == 3){
                  navigate('Map')
                }
              }}
              rightElement={{
                actions: [],
                menu: { labels: ['Delete', 'Rename', 'Time reminder', 'Location remainder', 'Sign out'] },
              }}
            />
            <ScrollView>
              {
                this.state.users.map(function (res, i) {
                  return (<ListItem
                    divider
                    leftElement="person"
                    centerElement={{
                      primaryText: res.name,
                    }}
                    onPress={() => {
                    }}
                    key={i}/>)
                })
              }
            </ScrollView>

            <Button primary text="Primary"/>
            <Button raised accent text="Accent"/>
            <Button raised primary text="Primary"/>
            <Button disabled text="Disabled"/>

          </View>
        </DrawerLayout>
      </ThemeProvider>
    )
  }
}
