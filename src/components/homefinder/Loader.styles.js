import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  loader: {
    display: 'flex',
    alignItems: 'top',
    justifyContent: 'center',
    zIndex: 1000, position:
      'absolute',
    width: '100%'
  },
  loaderCard: {
    marginTop: 20,
    width: 60,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))
