import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

import Toggle from 'material-ui/Toggle'
import IconMenu from 'material-ui/IconMenu'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Menu from 'material-ui/svg-icons/navigation/menu'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

import FlatButton from 'material-ui/FlatButton'

class LoginMenu extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login"/>
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
    <MenuItem primaryText="Refresh"/>
    <MenuItem primaryText="Help"/>
    <MenuItem primaryText="Sign out"/>
  </IconMenu>
)

Logged.muiName = 'IconMenu'

export default class Examples extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      logged: false
    }
  }

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  }

  handleToggle = () => this.setState({open: !this.state.open})

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Toggle
            label="Logged"
            defaultToggled={true}
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
                  iconElementRight={this.state.logged ? <Logged /> : <LoginMenu />}
          />
          <Drawer open={this.state.open}>
            <MenuItem href="/login">Remainders</MenuItem>
            <MenuItem href="/map">Save Location</MenuItem>
          </Drawer>
        </div>
      </MuiThemeProvider>
    )
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme, {userAgent: 'all'})};
  }

}

Examples.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}
