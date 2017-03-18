/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
//import api from './Utils/api'
import FBSDK from 'react-native-fbsdk';

import {
  AppRegistry,
  View,
  ListView
} from 'react-native';

const {
  LoginButton,
} = FBSDK;

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ShoppingAssistant extends Component {

  constructor(){
    super();
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillMount(){
/*    api.getData().then( (res) => {
      console.log(res);
      this.state = {
        dataSource: ds.cloneWithRows(res)
      };

    }).catch((error) => {
      console.log("Api call error", error.message);
      alert(error.message);
    });*/
  }

  render() {

    return (
      <View style={{flex:1}}>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions);
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>

    );
  }
}

AppRegistry.registerComponent('ShoppingAssistant', () => ShoppingAssistant);
