import React from 'react'
import SavedLists from "../SavedLists/index"

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as friendsActions, selector } from '../friends/'

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(friendsActions, dispatch)
}))

export default class Lists extends React.Component {

  render() {
    return (
      <div className="content-container">
        <SavedLists
          {...this.props}
          ref={(sidebar) => {
            this.sidebar = sidebar
          }}/>
      </div>
    )
  }
}
