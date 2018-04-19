import React, {Component} from 'react'
import {View, AsyncStorage, ScrollView, ToastAndroid, Platform, Text} from 'react-native'
import { ThemeProvider, ListItem, Button, Toolbar} from 'react-native-material-ui'
import DrawerLayout from 'react-native-drawer-layout-polyfill'
import cyanTheme from 'react-native-material-ui/src/styles/themes/cyan'
import { BottomNavigation } from 'react-native-material-ui'
import {baseUrl} from '../Utils'
import axios from 'axios'
// import { LoginManager } from 'react-native-fbsdk'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token:'',
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

  componentWillMount() {
    this.loadLists()
  }
  componentDidMount() {

    let users = [fetch(baseUrl+'/api/users').catch((err) => console.log('fetf: ', err))]
    this.getPromiseData(users).then( (res) => {
      this.setState({users: res.reduce((a, b) => [...a, ...b], [])})
    })
    this.loadLists()
  }

  loadLists() {
    //console.log('TOKEN:', this.state.token)
    AsyncStorage.getItem("token").then((value) => {
      this.setState({"token": value})
      axios({
        url: baseUrl + '/api/lists',
        headers: {'x-access-token': value}
      }).then( res => {
        this.setState({lists: res.data.lists})
      }).catch((err) => console.log('fetf: ', err))

    }).done()

    /*
    let lists = [fetch(baseUrl+'/api/lists').catch((err) => console.log('fetf: ', err))]
    this.getPromiseData(lists).then(res => {
      this.setState({lists: res.reduce((a, b) => [...a, ...b], [])})
    })*/
  }

  render() {
    const { navigate } = this.props.navigation
    let ctx = this
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
                navigate('Items',{listId: res._id })
              }}
              key={i}/>)
          })
        }
        <Button
          primary
          text="Create list"
          onPress={() => {
            fetch(baseUrl + "/api/lists/",
              {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-access-token': this.state.token
                },
                method: "POST",
                body: JSON.stringify({title: 'New List'})
              }).then((res) => {
              this.loadLists()
              console.log(res.json(), this.state.value, 'is saved')
            })
          }}
          style={{container: {backgroundColor: '#3b5998'}, text: {color: 'white'}}}
        />

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
                if(target.index == 4){
                  //LoginManager.getInstance().logOut()
                  AsyncStorage.removeItem('token')
                  AsyncStorage.getItem("token").then((value) => {
                    //console.log(LoginManager.getInstance(), 'zzz token:', value)
                  }).done()
                  navigate('Login')
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
                      //console.log('CTX: ',ctx)
                      ctx.setState({ token: res.token })
                      ctx.loadLists()
                    }}
                    key={i}/>)
                })
              }
            </ScrollView>

            <BottomNavigation active={this.state.active} hidden={false} >
              <BottomNavigation.Action
                key="add-circle-outline"
                icon="add-circle-outline"
                label="add item"
                onPress={() => this.setState({ active: 'today' })}
              />
              <BottomNavigation.Action
                key="share"
                icon="share"
                label="share"
                onPress={() => this.setState({ active: 'people' })}
              />
              <BottomNavigation.Action
                key="alarm"
                icon="alarm"
                label="alarm"
                onPress={() => this.setState({ active: 'bookmark-border' })}
              />
              <BottomNavigation.Action
                key="location-on"
                icon="location-on"
                label="location-on"
                onPress={() => this.setState({ active: 'settings' })}
              />
            </BottomNavigation>
          </View>
        </DrawerLayout>
      </ThemeProvider>
    )
  }
}
