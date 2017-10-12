import React from 'react'
import {Divider,TextField, List, ListItem, IconButton } from 'material-ui'
import Delete from 'material-ui/svg-icons/action/delete'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {baseUrl, getPromiseData} from '../../utils/Utils'

export default class Items extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'unknown',
      loading: false,
      lists:[],
      name:''
    }

    /*//Here ya go
    let ctx = this;
    this.props.history.listen((location, action) => {
      console.log("on route change");
      ctx.loadItems()
    });*/

    this.handleChange2 = this.handleChange2.bind(this)
  }

  componentDidMount() {
    this.loadItems()

  }

  handleChange = (event, logged) => {
    this.setState({logged: logged})
  }

  loadItems() {
    let lists = [fetch(baseUrl+'/api/items/'+this.props.params.list_id).catch((err) => console.log('fetf: ',err))]
    getPromiseData(lists).then( res => {
      this.setState({lists:res.reduce((a,b)=>[...a,...b],[]) })
    })
  }

  handleChange2(e) {
    this.setState({ name: e.target.value })
  }

  render() {
    return (
      <div style={{flex:1,padding:10}}>
        <div>
          <List>
            {
              this.state.lists.map((res, i) => {
                return <ListItem rightIconButton={<IconButton><Delete /></IconButton>} key={i} primaryText={res.name}/>
              })
            }
          </List>
        </div>
        <Divider />
        <div style={{flex:2}}>
          <TextField
            id="item-name"
            value={this.state.name}
            onChange={ this.handleChange2 }
          />
          <br />
          <FloatingActionButton
              onTouchTap={() => {
                if(this.state.name != '') {
                  fetch(baseUrl + "/api/items/" + this.props.params.list_id,
                    {
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      method: "POST",
                      body: JSON.stringify({name: this.state.name, completed: false})
                    }).then((res) => {
                    console.log(res.json(), this.state.value, 'is saved')
                    this.setState({name: ''})
                    this.loadItems()
                  })
                }
            }} >
            <ContentAdd />
          </FloatingActionButton>
      </div>
      </div>
    )
  }
}
