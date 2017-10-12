import React, {Component} from 'react'
import {View, Text, ScrollView} from 'react-native'
import {ThemeProvider, ListItem, Button, Toolbar, Icon} from 'react-native-material-ui'
import DrawerLayout from 'react-native-drawer-layout-polyfill'
import cyanTheme from 'react-native-material-ui/src/styles/themes/cyan'
import {MenuContext} from 'react-native-popup-menu'
import { BottomNavigation } from 'react-native-material-ui'
import {baseUrl} from '../Utils'

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu'

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
                navigate('Items', {listId:res._id})
              }}
              key={i}/>)
          })
        }
      </View>
    )

    return (

      <MenuContext>
        <ThemeProvider uiTheme={cyanTheme}>
          <DrawerLayout
            ref={(drawer) => this.drawer = drawer }
            drawerWidth={300}
            drawerPosition={DrawerLayout.positions.Left}
            renderNavigationView={() => navigationView}>
            <View>
              {/*<Toolbar
                leftElement="clear"
                centerElement="Custom styles"
                rightElement={{
                  actions: ['edit'],
                  menu: { labels: ['Item 1', 'Item 2'] },
                }}
              />*/}
              <Toolbar
                searchable={null}
                leftElement="menu"
                onLeftElementPress={this.openDrawer}
                rightElement={
                  <Menu>
                    <MenuTrigger>
                      <Icon name="more-vert" color="white" />
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption value="delete" text='Delete'/>
                      <MenuOption value="rename" disabled={true} text='Rename'/>
                      <MenuOption value="time_reminder" text='Time reminder'/>
                      <MenuOption onSelect={() => navigate('Map')} value="location_remainder" text='Location remainder'/>
                      <MenuOption value="sign_out" text='Sign out'/>
                    </MenuOptions>
                  </Menu>
                }
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

              <BottomNavigation active={this.state.active} hidden={false} >
                <BottomNavigation.Action
                  key="today"
                  icon="today"
                  label="Today"
                  onPress={() => this.setState({ active: 'today' })}
                />
                <BottomNavigation.Action
                  key="people"
                  icon="people"
                  label="People"
                  onPress={() => this.setState({ active: 'people' })}
                />
                <BottomNavigation.Action
                  key="bookmark-border"
                  icon="bookmark-border"
                  label="Bookmark"
                  onPress={() => this.setState({ active: 'bookmark-border' })}
                />
                <BottomNavigation.Action
                  key="settings"
                  icon="settings"
                  label="Settings"
                  onPress={() => this.setState({ active: 'settings' })}
                />
              </BottomNavigation>

              <MenuContext
                style={{flexDirection: 'column', padding: 30}}>
                <Text>Hello world!</Text>
                <Menu
                  opened={this.state.opened}
                  onBackdropPress={() => this.onBackdropPress()}
                  onSelect={value => this.onOptionSelect(value)}>
                  <MenuTrigger
                    onPress={() => this.onTriggerPress()}
                    text='Select option'/>
                  <MenuOptions>
                    <MenuOption value={1} text='One' />
                    <MenuOption value={2}>
                      <Text style={{color: 'red'}}>Two</Text>
                    </MenuOption>
                    <MenuOption value={3} disabled={true} text='Three' />
                  </MenuOptions>
                </Menu>
              </MenuContext>
            </View>
          </DrawerLayout>
        </ThemeProvider>
      </MenuContext>
    )
  }
}
