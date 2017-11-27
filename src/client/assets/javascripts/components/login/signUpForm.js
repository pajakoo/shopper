import React from 'react'
import {
    Button,
    IconButton,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent
    } from 'material-ui'
import CloseIcon from 'material-ui/svg-icons/navigation/close'

const SignUpForm = (props) => {
    return (
        <div>
        <Dialog
            ignoreBackdropClick={true}
            open = {props.open}
            onRequestClose={props.close}
        >
        <DialogTitle className={props.classes.flex}>
            <IconButton color="contrast" onClick={props.close} aria-label="Close">
                <CloseIcon />
              </IconButton></DialogTitle>
          <DialogContent className={props.classes.container}>
          <form className={props.classes.form} noValidate autoComplete="off" onSubmit={e => { e.preventDefault() }}>
                        <TextField
                            id="email"
                            label="Email"
                            className={props.classes.textField}
                            type="email"
                            margin="normal"
                            fullWidth
                            error={props.msg  && true}
                            value={props.email}
                            onChange={props.updateEmail}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            className={props.classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            fullWidth
                            error={props.msg  && true}
                            value={props.password}
                            onChange={props.updatePassword}
                        />
                        <Typography className={props.classes.errorMsg} type="caption">{props.msg}</Typography>
                        <Button className={props.classes.signUpBottom} onClick={props.submit} type="button">Register</Button>
                    </form>
            </DialogContent>
        </Dialog>
      </div>
    )
}

export default SignUpForm
