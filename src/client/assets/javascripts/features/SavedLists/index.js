import React, {Component, PropTypes} from 'react'
import {List, ListItem} from 'material-ui/List'
import {browserHistory} from 'react-router'
import {baseUrl} from '../../utils/Utils'
import Paper from 'material-ui/Paper'

export default class SavedLists extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    friends: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      lists:[],
      shared:[]
    }
  }

  componentDidMount() {
    this.loadLists()
  }

  loadLists() {
    var token = localStorage.getItem('token')
    fetch(baseUrl+'/api/lists',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 'x-access-token': token
      }}).
    then( (x) =>  x.json() ).
    then( (res) => {
      this.setState({lists:res.lists})
      this.setState({shared:res.shared})

    }).
    catch((err) => console.log('fetf: ', err))

    /*this.getPromiseData(user).then(res => {
      console.log(res)
      this.setState({user: res.reduce((a, b) => [...a, ...b], [])})
      // this.setState({shared: res.shared.reduce((a, b) => [...a, ...b], [])})
    })*/
  }

  getPromiseData(x) {
    return new Promise((resolve, reject) => {
      Promise.all(x)
        .then((res) => {
          return res.map((data) => data.json())
        })
        .then((res) => {
          Promise.all(res).then(resolve)
        }).catch(reject)
    })
  }

  render() {
    const { actions } = this.props

    let arr = this.state.lists.map(function (res, i) {
      return (<ListItem
        onClick={() => {
          {/*this.props.currentList({title:res.title, id: res._id})*/}
          actions.selectList(res._id, res.title)
          browserHistory.push('/items/'+res._id)
        }}
        key={i}
        primaryText={res.title}/>)
    }.bind(this))

    let arr2 = this.state.shared.map(function (res, i) {
      return (<ListItem
        onClick={() => {
          {/*this.props.currentList({title:res.title, id: res._id})*/}
          browserHistory.push('/items/'+res._id)
        }}
        key={i}
        primaryText={res.title}/>)
    }.bind(this))

    return (
      <List>
        <Paper zDepth={1} style={{marginBottom:'15px'}}>
          <ListItem
          primaryText="My Lists"
          initiallyOpen
          primaryTogglesNestedList
          nestedItems={arr}
          />
        </Paper>
        <Paper zDepth={1} >
          <ListItem
            primaryText="Shared Lists"
            initiallyOpen
            primaryTogglesNestedList
            nestedItems={arr2}
          />
        </Paper>
      </List>
    )
  }
}
