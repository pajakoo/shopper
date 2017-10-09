/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'
import cyanTheme from 'react-native-material-ui/src/styles/themes/cyan'
import {ThemeProvider, ListItem, Button, Toolbar, Icon} from 'react-native-material-ui'
import {baseUrl} from '../Utils'

export default class Items extends Component {

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
    const { params } = this.props.navigation.state;
    let users = [fetch(baseUrl+'/api/items/'+params.listId).catch((err) => console.log('fetf: ', err))]
    this.getPromiseData(users).then(res => {
      this.setState({users: res.reduce((a, b) => [...a, ...b], [])})
    })

  }

  render() {

    return (
        <ThemeProvider uiTheme={cyanTheme}>
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
        </ThemeProvider>

    )
  }

}

const styles = StyleSheet.create({
  view: {
    padding:50
  },
  list: {
    flex: 1,
    padding: 30,
    backgroundColor: 'rgb(39, 174, 96)'
  },
  text: {
    fontSize: 20,
    color: 'white'
  }

})

