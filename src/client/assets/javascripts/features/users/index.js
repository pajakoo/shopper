import React from 'react'
import {List, ListItem} from 'material-ui/List'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {baseUrl} from '../../utils/Utils'
import {browserHistory} from 'react-router'

export default class Users extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'unknown',
      loading: false,
      data: {},
      users: []
    }
  }

  handleChange = (event, logged) => {
    this.setState({logged: logged})
  }

  getPromiseData( x ){
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

  componentDidMount() {
    var token = localStorage.getItem('token')
    let users = [fetch(baseUrl+'/api/users',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 'x-access-token': token
      }}).catch((err) => console.log('fetf: ',err))]
    this.getPromiseData(users).then( res => {
      this.setState({users:res.reduce((a,b)=>[...a,...b],[]) })
    })

  }

  render() {
    return (
      <div className="content-container">
        <List>
          {
            this.state.users.map((res, i) => {
              return (<ListItem
                key={i}
                primaryText={res.name}
                onClick={ () => {
                  localStorage.setItem('token', res.token)
                  browserHistory.push('/lists/')
                }}
              />)
            })
          }
        </List>
        <FloatingActionButton>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}
