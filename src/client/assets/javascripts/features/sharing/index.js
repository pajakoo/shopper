import React, { Component, PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import {baseUrl, getPromiseData} from '../../utils/Utils'
import { ValidatorForm } from 'react-form-validator-core'
import { TextValidator } from 'react-material-ui-form-validator'

export default class Sharing extends Component {
  /*static propTypes = {
    actions: PropTypes.object.isRequired,
    friends: PropTypes.array.isRequired
  }*/

  constructor(props) {
    super(props)
    this.state = {
      // https://www.npmjs.com/package/react-material-ui-form-validator
      friends: [],
      friend:'',
      formData: {
        email: '',
      },
      submitted: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    var token = localStorage.getItem('token')
    let users = [fetch(baseUrl+'/api/friends',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 'x-access-token': token
      }}).catch((err) => console.log('fetf: ',err))]
    getPromiseData(users).then( res => {
      this.setState({friends:res.reduce((a,b)=>[...a,...b],[]) })
    })

  }

  render() {
    const { formData, submitted } = this.state
    return (
      <div>
        <ValidatorForm
          onSubmit={this.handleSubmit}
          instantValidate={false}
        >
          <h2>Add friend via email</h2>
          <TextValidator
            ref="email"
            floatingLabelText="Email"
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            name="email"
            value={formData.email}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
          />
          <br />

          <RaisedButton
            type="submit"
            label={
              (submitted && 'Add friend') ||
              (!submitted && 'Find')
            }
            disabled={submitted}
          />
        </ValidatorForm>
        <RaisedButton
          onClick={ () => {
            var token = localStorage.getItem('token')
            fetch(baseUrl+'/api/friends/',{
              method: 'put',
              body: JSON.stringify({friendId: this.state.friend._id}),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 'x-access-token': token,
              }}).
            then( (x) =>  x.json() ).
            then( (res) => {
              console.log('gg: ', res)
              this.setState({friends:[...this.state.friends, res]})
              this.setState({formData:{email:''}})
            }).
            catch((err) => console.log('fetf: ', err))
          }}
          label="Add"
        />
        <List>
          {
            this.state.friends.map((res, i) => {
              return (<ListItem
                key={i}
                primaryText={res.name}
                onClick={ () => {
                  var token = localStorage.getItem('token')
                  console.log(res.name, res._id, this.props.params.list_id)
                  fetch(baseUrl+'/api/share/',{
                    method: 'put',
                    body: JSON.stringify({friendId: res._id, listId: this.props.params.list_id }),
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json', 'x-access-token': token,
                    }}).
                  then( (x) =>  x.json() ).
                  then( (res) => {
                    console.log('gg: ', res)
                  }).
                  catch((err) => console.log('fetf: ', err))
                }}
              />)
            })
          }
        </List>

      </div>
    )
  }

  handleChange(event) {
    const { formData } = this.state
    formData[event.target.name] = event.target.value
    this.setState({ formData })
  }

  handleBlur(event) {
    this.refs[event.target.name].validate(event.target.value)
  }

  handleSubmit() {
    this.setState({ submitted: true }, () => {
      var token = localStorage.getItem('token')
      fetch(baseUrl+'/api/friends/'+this.state.formData.email,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', 'x-access-token': token
        }}).
      then( (x) =>  x.json() ).
      then( (res) => {
        this.setState({friend:res})
        this.setState({friends:[...this.state.friends, res]})
        this.setState({formData:{email:''}})
      }).
      catch((err) => console.log('fetf: ', err))

      setTimeout(() => {
        this.setState({ submitted: false }), 5000
      })
    })
  }

}
