import React, {Component} from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

export const DIALOG_TYPES = {
  'DELETE': 'DELETE',
  'CREATE': 'CREATE'
}
export default class DialogWindow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dialogType: 'none',
      value: '',
      openDialog: false,
      currentListName: '',
      currentListId: '',
    }

    this.loadLists = props.loadLists;
    this.handleChange = this.handleChange.bind(this)
  }

  handleOpen = (opt) => {
    this.setState({openDialog: true})
    this.setState({currentListName: opt.currentListName})
    this.setState({currentListId: opt.currentListId})
    this.setState({dialogType: opt.type})
    if (opt.type == DIALOG_TYPES.DELETE) {
      this.setState({title: 'Delete List'})
    } else if (opt.type == DIALOG_TYPES.CREATE) {
      this.setState({title: 'Create List'})
    }
    window.modal = this
  };

  handleClose = () => {
    this.setState({openDialog: false})
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  render() {

    const actions = [<FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={this.handleClose}
    />]

    if (this.state.dialogType == DIALOG_TYPES.CREATE) {
      actions.push(<FlatButton
        label="Ok"
        primary={true}
        onTouchTap={() => {
          fetch("http://localhost:8080/api/lists/",
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({title: this.state.value})
            }).then((res) => {
            this.handleClose()
            this.loadLists()
            console.log(res.json(), this.state.value, 'is saved')
          })
        }}
      />)
    } else if (this.state.dialogType == DIALOG_TYPES.DELETE) {
      actions.push(<FlatButton
        label="Ok"
        primary={true}
        onTouchTap={() => {
          fetch("http://localhost:8080/api/lists/" + this.state.currentListId,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "DELETE"
            }).then((res) => {
            this.handleClose()
            this.loadLists()
            console.log(res.json(), this.state.currentListName, 'is Deleted')
            this.setState({currentListName: ''}, function () {
              console.log('changed:', this)
            })
            this.setState({currentListId: ''})

          })
        }}
      />)
    }

    return (<Dialog
      title={this.state.title}
      actions={actions}
      modal={true}
      open={this.state.openDialog}>
      {(() => {
        switch (this.state.dialogType) {
          case DIALOG_TYPES.CREATE :
            return (<TextField
              floatingLabelText="List name"
              fullWidth={true}
              value={this.state.value}
              onChange={this.handleChange}
            />)
          case DIALOG_TYPES.DELETE :
            return <div>Confirm deletion for {this.state.currentListName} list</div>
          default:
            return null
        }
      })()}

    </Dialog>)
  }
}
