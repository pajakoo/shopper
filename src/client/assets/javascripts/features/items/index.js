import React, {Component} from 'react'
import {List, ListItem} from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'

export default class Items extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: {
        items:[]
      }
    }
    // console.log('props:', this.props.params.list_id);
  }

  componentDidMount() {
    this.loadLists()
  }

  loadLists() {
    let lists = [fetch('http://localhost:8080/api/lists/' + this.props.params.list_id).catch((err) => console.log('fetf: ', err))]
    this.getPromiseData(lists).then(res => {
      this.setState({ list: res[0]})//.reduce((a, b) => [...a, ...b], [] )})
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
    console.log(this.state.list.items)
    this.state.list.items.map((el) => console.log(el) )
    return (<List>
        {
          this.state.list.items.map(function (res, i) {
            return (<ListItem
              leftCheckbox={<Checkbox />}
              key={i}
              primaryText={res.name}/>)
            }.bind(this))
        }
      </List>
    )
  }
}
