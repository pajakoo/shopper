import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {TextField} from 'material-ui'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import Alarm from 'material-ui/svg-icons/action/alarm'
import Share from 'material-ui/svg-icons/social/share'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import ContentAdd from 'material-ui/svg-icons/content/add'
import TimePicker from 'material-ui/TimePicker'

const alarm = <Alarm />
const nearbyIcon = <IconLocationOn />
const share = <Share />
const edit = <Edit />

export default class BottomNav extends React.Component {

  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  componentDidMount() {

  }

  render() {
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
            onClick={() => this.select(2) }
          />
          <BottomNavigationItem
            label="Location"
            icon={nearbyIcon}
            onClick={() => this.select(3)}
          />
        </BottomNavigation>
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
