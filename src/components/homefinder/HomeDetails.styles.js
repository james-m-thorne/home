import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  card: {
    minHeight: 350
  },
  header: {
    paddingBottom: 0
  },
  closeButton: {
    marginLeft: 'auto',
    height: 30,
    background: '#fff',
    marginTop: 5,
    marginRight: 5
  },
  closeBox: {
    height: 0,
    flex: 1
  },
  smallText: {
    fontSize: 11
  }
}))
