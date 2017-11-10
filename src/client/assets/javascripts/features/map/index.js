import {
  default as React,
  Component,
} from "react"
import {PropTypes as T} from 'react'
import {makeCancelable} from './src/lib/cancelablePromise'
import {baseUrl} from '../../utils/Utils'
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "./lib"

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as friendsActions, selector } from '../friends/'

const ClosureListenersExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={13}
    center={new google.maps.LatLng(props.currentLocation.lat, props.currentLocation.lng)}
  >
    <Marker
      position={new google.maps.LatLng(props.currentLocation.lat, props.currentLocation.lng)}
      title='Pick a position'
      draggable={true}

    />
    <Marker />
  </GoogleMap>
))

function generateInitialMarkers() {
  const southWest = new google.maps.LatLng(-31.203405, 125.244141);
  const northEast = new google.maps.LatLng(-25.363882, 131.044922);

  const lngSpan = northEast.lng() - southWest.lng();
  const latSpan = northEast.lat() - southWest.lat();

  const markers = [];
  for (let i = 0; i < 5; i++) {
    const position = new google.maps.LatLng(
      southWest.lat() + latSpan * Math.random(),
      southWest.lng() + lngSpan * Math.random()
    );
    markers.push({
      position,
      content: `This is the secret message`.split(` `)[i],
      showInfo: false,
    });
  }
  return markers;
}

/*
 * https://developers.google.com/maps/documentation/javascript/examples/event-closure
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(friendsActions, dispatch)
}))

export default class Map extends Component {

  static propTypes = {
    zoom: T.number,
    centerAroundCurrentLocation: T.bool,
    center: T.object,
    initialCenter: T.object,
  }

  static defaultProps = {
    zoom: 14,
    initialCenter: {
      lat: 37.774929,
      lng: -122.419416
    },
    center: {},
    centerAroundCurrentLocation: false,
    style: {},
    containerStyle: {},
    visible: true
  }
  constructor(props) {
    super(props)

    this.state = {
      markers: generateInitialMarkers(),

      currentLocation: {
        lat: this.props.initialCenter.lat,
        lng: this.props.initialCenter.lng
      }
    }
  }

  componentWillMount() {
    if (navigator && navigator.geolocation) {
      this.geoPromise = makeCancelable(
        new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        })
      );

      /*this.geoPromise.promise.then(pos => {
        const coords = pos.coords

        this.state.dispatch({
          type: 'UPDATE_COORDS',
          payload: {
            lat: coords.latitude,
            lng: coords.longitude
          }

        })

        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        })
      }).catch(e => e);*/
    }

  }

  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleCloseClick = this.handleCloseClick.bind(this);
  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }
  handleCloseClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  render() {

    return (
      <ClosureListenersExampleGoogleMap
        actions={this.props.actions}

        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        onMarkerClick={this.handleMarkerClick}
        onCloseClick={this.handleCloseClick}
        markers={this.state.markers}
        currentLocation={this.state.currentLocation}
        listId={this.props.params.list_id}
      />
    );
  }
}


