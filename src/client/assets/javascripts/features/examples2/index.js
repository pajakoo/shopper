import React, {Component} from 'react'

export default class LoginMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: 'Hi',
    }
    //this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    console.log(this.state)
    this.setState({message: event.target.value})
  }

  render() {
    var message = this.state.message
    return (
      <input type="text" value={message} onChange={(event) => {
        this.setState({message: event.target.value})
        console.log(this.state.message)
      } }/>
    )
  }
}
