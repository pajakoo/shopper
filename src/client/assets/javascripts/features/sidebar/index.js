import React, {Component} from 'react'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import {ListItem} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import Toggle from 'material-ui/Toggle'
import IconMenu from 'material-ui/IconMenu'
import AppBar from 'material-ui/AppBar'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Menu from 'material-ui/svg-icons/navigation/menu'
import {browserHistory} from 'react-router'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import FlatButton from 'material-ui/FlatButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Notifier from '../../components/notification/index'
import {DIALOG_TYPES} from '../../features/dialog/index'
import SavedLists from "../SavedLists/index"

// https://reacttraining.com/react-router/web/api/matchPath
// onClick={(e)=>console.log(e.latLng.lat(), e.latLng.lat())}
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
    iconStyle={{ fill: 'white' }}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Delete" onTouchTap={ () => {
      props.handleOpen(DIALOG_TYPES.DELETE)
    }}/>
    <MenuItem primaryText="Rename"/>
    <MenuItem onClick={ () => browserHistory.push('/map/'+props.list_id) }>Location Remainder</MenuItem>
    <MenuItem primaryText="Sign out"/>
  </IconMenu>
)

Logged.muiName = 'IconMenu'

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      logged: true,
      lastButtonClicked: null,
      listName:'',
      listId:''
    }
  }

  handleChange = (event, logged) => {
    this.setState({logged: logged})
  }

  handleToggle = () => this.setState({open: !this.state.open})

  changeListItems(list) {
    this.handleToggle()
    this.setState({listName:list.title})
    this.setState({listId:list.id})
  }

  loadLists() {
    this.sidebar.loadLists()
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          {/*<Toggle
            label="Logged"
            defaultToggled={false}
            onToggle={this.handleChange}
            labelPosition="right"
            style={{margin: 20}}
          />*/}
          <AppBar onLeftIconButtonTouchTap={this.handleToggle}
                  title={this.state.listName}
                  iconElementLeft={
                    this.state.open ?
                      <IconButton><NavigationClose /></IconButton> :
                      <IconButton><Menu  /> </IconButton>}
                  iconElementRight={this.state.logged ?
                    <Logged list_id={this.state.listId} handleOpen={this.props.handleOpen.bind(this)}/> :
                    <LoginButton />}
          />
          <Drawer
            onRequestChange={(open) => this.setState({open})}
            docked={false}
            open={this.state.open}>
            <div style={{width: '220px', height: 'auto', marginTop: '20px', marginBottom: '20px', textAlign: 'center'}}>
              <img width="160"
                   src="https://d2d93p0ay5a1wc.cloudfront.net/assets/dashboard/shopify_glyph-246da25d402eaf60ea0610b23e96be5c.png"/>

            </div>

            <Notifier />
            <ListItem onClick={ () => browserHistory.push('/users') }>Users</ListItem>

            <Divider />
            <ListItem
              leftIcon={<ContentAdd />}
              onClick={ () => {
                  this.handleToggle()
                  this.props.handleOpen(DIALOG_TYPES.CREATE)
                }
              }>Create New List</ListItem>
            <SavedLists
              currentList={this.props.currentList}
              ref={(sidebar) => {
                this.sidebar = sidebar
              }}/>
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
