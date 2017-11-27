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

const ForgotForm = (props) => {
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
					margin="normal"
					fullWidth
					error={props.msg !== 'Password reset email sent.' && true}
					value={props.email}
					onChange={props.updateEmail}
				/>
                <Typography className={props.classes.errorMsg} type="caption">{props.msg}</Typography>
				<Button disabled={props.msg === 'Password reset email sent.'} className={props.classes.signUpBottom} onClick={props.submit} type="button">Send EMail</Button>
			</form>
            </DialogContent>
        </Dialog>
      </div>
    )
}

export default ForgotForm
