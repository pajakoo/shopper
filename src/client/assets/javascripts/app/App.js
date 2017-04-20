import React, {PropTypes} from 'react'
import Sidebar from 'features/sidebar/index'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const App = (props) => (
  <MuiThemeProvider>
    <div className="page-container">
      <Sidebar/>
      {React.cloneElement({...props}.children, {...props})}
    </div>
  </MuiThemeProvider>
)

App.propTypes = {
  children: PropTypes.element.isRequired
}

export default App
