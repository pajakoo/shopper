import React, {Component} from 'react'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

import {List, ListItem} from 'material-ui/List';
import ListIcon from 'material-ui/svg-icons/action/list';
import IconButton from 'material-ui/IconButton';

import Toggle from 'material-ui/Toggle'
import IconMenu from 'material-ui/IconMenu'
import AppBar from 'material-ui/AppBar'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Menu from 'material-ui/svg-icons/navigation/menu'

import { push } from 'react-router-redux';
import { browserHistory } from 'react-router'

import NavigationClose from 'material-ui/svg-icons/navigation/close'

import FlatButton from 'material-ui/FlatButton'

class LoginButton extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} onClick={ () => browserHistory.push('/login') } label="Login"/>
    )
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Delete"/>
    <MenuItem primaryText="Rename"/>
    <MenuItem onClick={ () => browserHistory.push('/map') }>Location Remainder</MenuItem>
    <MenuItem primaryText="Sign out"/>
  </IconMenu>
)

Logged.muiName = 'IconMenu'

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      logged: false
    }
  }

  handleChange = (event, logged) => {
    this.setState({logged: logged})
  }

  handleToggle = () => this.setState({open: !this.state.open})

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Toggle
            label="Logged"
            defaultToggled={false}
            onToggle={this.handleChange}
            labelPosition="right"
            style={{margin: 20}}
          />
          <AppBar onLeftIconButtonTouchTap={this.handleToggle}
                  title="List for LIDL"
                  iconElementLeft={
                    this.state.open ?
                      <IconButton><NavigationClose /></IconButton> :
                      <IconButton><Menu  /> </IconButton>}
                  iconElementRight={this.state.logged ? <Logged /> : <LoginButton />}
          />
          <Drawer
            onRequestChange={(open) => this.setState({open})}
            docked={false}
            open={this.state.open}>
            <div style={{width: '220px', height: 'auto', marginTop: '20px', marginBottom: '20px', textAlign: 'center'}}>
              <img width="160"
                   src="https://d2d93p0ay5a1wc.cloudfront.net/assets/dashboard/shopify_glyph-246da25d402eaf60ea0610b23e96be5c.png"/>

            </div>

            <ListItem onClick={ () => browserHistory.push('/users') }>Users</ListItem>
            <Divider />
            <List>
              <ListItem
                primaryText="Lists"
                leftIcon={<ListIcon />}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText="LIDL"
                  />
                ]}
              />
            </List>
          </Drawer>
        </div>
      </MuiThemeProvider>
    )
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme, {userAgent: 'all'})};
  }

}

Sidebar.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}
