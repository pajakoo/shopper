import React from 'react'
import {TextField, Checkbox, List, ListItem, IconButton} from 'material-ui'
import Delete from 'material-ui/svg-icons/action/delete'
import {baseUrl, getPromiseData} from '../../utils/Utils'
import {grey600} from 'material-ui/styles/colors'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

class CheckBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      checked: this.props.completed != false ? this.props.currentItem.completed : false
    }
  }
//https://hashnode.com/post/why-is-it-a-bad-idea-to-call-setstate-immediately-after-componentdidmount-in-react-cim5vz8kn01flek53aqa22mby
  render() {
    return (
      <Checkbox
        checked={this.state.checked}
        onClick={ () => {
          console.log(this.state)
          let newItems = this.props.items.map( (x) => {
            if( x._id === this.props.currentItem._id){
              x.completed = !this.state.checked
              console.log(x)
            }
            return x
          })
            fetch(baseUrl + "/api/update/list/" + this.props.params.list_id,
              {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({items: newItems})
              }).then(() => {
              this.setState({checked: !this.state.checked})
              console.log('Checkbox: ', this.state.checked)
            })
          }
        }
      />)
  }
}

export default class Items extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'unknown',
      loading: false,
      items: [],
      name: ''
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
    let items = [fetch(baseUrl + '/api/items/' + this.props.params.list_id).catch((err) => console.log('fetf: ', err))]
    getPromiseData(items).then(res => {
      this.setState({items: res.reduce((a, b) => [...a, ...b], [])})
    })
  }

  handleChange2(e) {
    this.setState({name: e.target.value})
  }

  render() {
    return (
      <div style={{flex: 1, padding: 10}}>
        <div>
          <List>
            {
              this.state.items.map((res, i) =>
                <ListItem
                  key={i}
                  primaryText={res.name}
                  leftCheckbox={<CheckBox currentItem={res} params={this.props.params} items={this.state.items}/>}
                  rightIconButton={
                    <IconButton
                      onClick={ () =>
                        fetch(baseUrl + "/api/list/" + this.props.params.list_id + "/item/" + res._id,
                          {
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            },
                            method: "PUT"
                          }).then((res1) => {
                          console.log('it\'s me: ' + this.props.params.list_id + "/" + res._id)
                          this.loadItems()

                        })}
                      iconStyle={{fill: grey600}}>
                      <Delete />
                    </IconButton>}
                />
              )
            }
          </List>
          <TextField
            id="item-name"
            value={this.state.name}
            onChange={ this.handleChange2 }
          />

          <br />
          <FloatingActionButton
            onTouchTap={() => {
              if (this.state.name != '') {
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
            }}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
    )
  }
}
