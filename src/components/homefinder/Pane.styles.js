import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  card: {
    zIndex: 1000,
    position: 'absolute',
    margin: 20,
    width: 300,
    display: 'grid',
    gridGap: 20
  },
  drawer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  baseDrawer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 50
  }
}))
