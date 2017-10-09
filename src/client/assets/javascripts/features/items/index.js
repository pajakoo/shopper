import React from 'react'
import {List, ListItem} from 'material-ui/List'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

export default class Items extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'unknown',
      loading: false,
      data: {},
      users: []
    }
     // console.log('gg:',)
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
    let users = [fetch('http://localhost:8080/api/items/'+this.props.params.list_id).catch((err) => console.log('fetf: ',err))]
    this.getPromiseData(users).then( res => {
      this.setState({users:res.reduce((a,b)=>[...a,...b],[]) })
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
