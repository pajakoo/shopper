/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class Map extends Component {

  state = {
    initialPosition: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    },
    lastPosition: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    },
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    },
  };

  watchID: ?number = null;

  constructor(props){
    super(props);

    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position;
        this.setState({region:initialPosition});
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}  //true
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log('watchID',position)
      var lastPosition = JSON.stringify(position);
      this.setState({region:lastPosition});

      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region) {
    this.setState({lastPosition:region});
    this.setState({region:region});
    //console.log('watchID2',this.state.lastPosition)
  }

  render() {
    const {region} = this.state;
    console.log('3',this.state.initialPosition,'watchID2',this.state.lastPosition,);
    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
          followUserLocation={true}
          //region={region}
        >
        </MapView>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          {this.state.lastPosition.latitude}
          {this.state.initialPosition.latitude}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          {this.state.lastPosition.longitude}
          {this.state.initialPosition.longitude}
        </Text>
      </View>
    );
  }
}

