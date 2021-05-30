import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  popover: {
    height: 100,
    padding: '20px 0',
    marginTop: 10,
    overflow: 'hidden'
  },
  valueLabel: {
    left: '90%',
    top: 0,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  markLabel: {
    fontSize: '0.775rem'
  },
  buttonLabel: {
    textTransform: 'none',
    flexDirection: 'column'
  }
}))
