import React, {Component} from 'react'
import {List, ListItem} from 'material-ui/List'
import {browserHistory} from 'react-router'
import {baseUrl} from '../../utils/Utils'

export default class SavedLists extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selected:'',
      lists: []
    }
  }

  componentDidMount() {
    this.loadLists()
  }

  loadLists() {
    let lists = [fetch(baseUrl+'/api/lists').catch((err) => console.log('fetf: ', err))]
    this.getPromiseData(lists).then(res => {
      this.setState({lists: res.reduce((a, b) => [...a, ...b], [])})
    })
  }

  getPromiseData(x) {
    return new Promise((resolve, reject) => {
      Promise.all(x)
        .then(res => {
          return res.map(data => data.json())
        })
        .then(res => {
          Promise.all(res).then(resolve)
        }).catch(reject)
    })
  }

  render() {
    let arr = this.state.lists.map(function (res, i) {
      return (<ListItem
        onClick={ () => {
          this.props.currentList({title:res.title, id: res._id})
          browserHistory.push('/items/'+res._id)
        }}
        key={i}
        primaryText={res.title}/>)
    }.bind(this))

    return (
      <List>
        <ListItem
          primaryText="My Lists"
          initiallyOpen={true}
          primaryTogglesNestedList={true}
          nestedItems={arr}
        />
      </List>
    )
  }
}
