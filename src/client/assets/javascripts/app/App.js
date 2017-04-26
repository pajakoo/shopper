import React, {Component, PropTypes} from 'react'
import Sidebar from 'features/sidebar/index'
import DialogWindow from 'features/dialog/index'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dialogType: 'none',
    }
  }

  handleOpen(type) {
    this.dialog.handleOpen(type)
  }

  render() {

    return (
      <MuiThemeProvider>
        <div className="page-container">
          <Sidebar handleOpen={this.handleOpen.bind(this)} />
          <DialogWindow ref={(dialog) => { this.dialog = dialog }}/>
          {React.cloneElement({...this.props}.children, {...this.props, handleOpen:this.handleOpen.bind(this)})}
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
}

// http://stackoverflow.com/questions/31841949/react-this-cloneelement-and-es6
/*const App = (props) => (
 <MuiThemeProvider>
 <div className="page-container">
 <Sidebar/>
 <Dialog/>
 {React.cloneElement({...props}.children, {...props})}
 </div>
 </MuiThemeProvider>
 )

 App.propTypes = {
 children: PropTypes.element.isRequired
 }


 export default App*/
