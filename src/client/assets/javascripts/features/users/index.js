import React from 'react'
import axios from 'axios'
import {List, ListItem} from 'material-ui/List'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


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

  componentDidMount() {
    axios.get('http://10.10.0.119:8080/api/bears', {
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((result) => {
        this.setState({users: result.data})
      })

  }

  render() {
    return (
      <div>
        <List>
          {
            this.state.users.map((res, i) => {
              return <ListItem key={i} primaryText={res.name}/>
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
