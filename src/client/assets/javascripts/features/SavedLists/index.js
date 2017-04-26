import React, {Component} from 'react'
import {List, ListItem} from 'material-ui/List'

export default class SavedLists extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lists: [],
    }
  }

  componentDidMount() {

    let lists = [fetch('http://localhost:8080/api/lists').catch((err) => console.log('fetf: ', err))]
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
        key={i}
        primaryText={res.title}/>)
    })

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
