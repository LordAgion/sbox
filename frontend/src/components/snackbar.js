import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Check from '@material-ui/icons/Check'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'

import { green } from '@material-ui/core/colors'
import { red } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import MuiSnackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { makeStyles } from '@material-ui/core/styles'

const variantIcon = {
  success: Check,
  danger: Check,
  info: InfoIcon
}


const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green['500']
  },
  danger: {
    backgroundColor: red['500']
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
}))

function SnackbarContentWrapper(props) {
  const classes = useStyles()
  const { className, message, onClose, variant } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby='client-snackbar'
      message={
        <span id='client-snackbar' className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key='close' aria-label='close' color='inherit' onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
    />
  )
}

SnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning','danger']).isRequired
}

export default function Snackbar(props) {
  return (
    <div>
      <MuiSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={props.open}
        autoHideDuration={props.autoHideDuration}
        onClose={props.onClose}
      >
        <SnackbarContentWrapper
          onClose={props.onClose}
          variant={props.variant}
          message={props.message}
        />
      </MuiSnackbar>
    </div>
  )
}

Snackbar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning','danger']).isRequired,
  onClose: PropTypes.func,
  autoHideDuration: PropTypes.number
}
