import React, {Component, PropTypes} from 'react'
import Sidebar from 'features/sidebar/index'
import DialogWindow from 'features/dialog/index'
import BottomNav from 'features/BottomNav/index'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentListName: '',
      currentListId: ''

    }
  }

  handleOpen(t) {
    this.dialog.handleOpen({
      type: t,
      currentListName:this.state.currentListName,
      currentListId:this.state.currentListId })
  }

  loadLists() {
    this.sidebar.loadLists()
  }

  currentList(p) {
    this.setState({currentListName: p.title})
    this.setState({currentListId: p.id})
    this.sidebar.changeListItems(p.title)
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="page-container">
          <Sidebar
            ref={(sidebar) => {
              this.sidebar = sidebar
            }}
            handleOpen={this.handleOpen.bind(this)}
            currentList={this.currentList.bind(this)}
          />
          <DialogWindow
            loadLists={this.loadLists.bind(this)}
            ref={(dialog) => {
              this.dialog = dialog
            }}/>
          {
            React.cloneElement({...this.props}.children, {
              ...this.props,
              handleOpen: this.handleOpen.bind(this),
            })
          }
          <BottomNav />
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
