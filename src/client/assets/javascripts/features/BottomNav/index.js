import FloatingActionButton from 'material-ui/FloatingActionButton'
import {TextField} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import React from 'react'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import Alarm from 'material-ui/svg-icons/action/alarm'
import Share from 'material-ui/svg-icons/social/share'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {baseUrl} from '../../utils/Utils'
import {browserHistory} from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as friendsActions, selector } from '../friends/'

const alarm = <Alarm />
const nearbyIcon = <IconLocationOn />
const share = <Share />
const edit = <Edit />

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(friendsActions, dispatch)
}))

export default class BottomNav extends React.Component {

  state = {
    selectedIndex: 0,
    open:false,
    time:null,
    date: null
  };

  select = (index) => this.setState({selectedIndex: index});

  componentDidMount() {

  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false})
    var time = this.state.time ? this.state.time : new Date()
    var date = this.state.date ? this.state.date : new Date()
    //console.log( date.getFullYear()+','+date.getMonth()+','+date.getDay()+','+ time.getHours()+','+time.getMinutes()+','+time.getSeconds()+','+ time.getMilliseconds(),
    //   new Date(
    //   date.getFullYear(),
    //   date.getMonth(),
    //   date.getDate(),
    //   time.getHours(),
    //   time.getMinutes(),
    //   time.getSeconds(),
    //   time.getMilliseconds() )

    fetch(baseUrl + "/api/listtime/59e617ad920f400ca475b885",//" + this.props.params.list_id + "
    {
      headers: {
        'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      method: "PUT",
      body:  JSON.stringify({ time: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds(),
      time.getMilliseconds() ).getTime() }),

    } ).then(() => {})

  }
  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
    return (
      <div>
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Add"
            icon={edit}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Share"
            icon={share}
            onClick={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Time"
            icon={alarm}
            onClick={this.handleOpen}
          />
          <BottomNavigationItem
            label="Location"
            icon={nearbyIcon}
            onClick={ () => browserHistory.push('/map/'+props.list_id) }
            // onClick={() => this.select(3)}
          />
        </BottomNavigation>
        <Dialog
          title="Set Date/Time Reminder"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {/*https://medium.com/differential/how-to-setup-push-notifications-in-react-native-ios-android-30ea0131355e*/}
          <TimePicker autoOk={true} onChange={(n, _time) =>  this.setState({time: _time}) } hintText="Time Picker" />
          <DatePicker autoOk={true} onChange={(n, _date) =>  this.setState({date: _date}) } hintText="Date Picker" />
        </Dialog>

        <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
{/*
          <TextField
            id="item-name"
            value={this.state.name}
            onChange={ this.handleChange2 }
          />
          <br />
          <FloatingActionButton
            onTouchTap={() => {
              if(this.state.name != '') {
                fetch(baseUrl + "/api/items/" + this.props.params.list_id,
                  {
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({name: this.state.name, completed: false})
                  }).then((res) => {
                  console.log(res.json(), this.state.value, 'is saved')
                  this.setState({name: ''})
                  this.loadItems()
                })
              }
            }} >
            <ContentAdd />
          </FloatingActionButton>*/}

        </div>
      </Paper>
      </div>
    )
  }
}
