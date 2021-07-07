import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: '0px 1fr 0px',
    alignItems: 'center'
  },
  image: {
    verticalAlign: 'middle',
    width: '100%',
    height: 250,
    objectFit: 'cover'
  },
  nextImageContainer: {
    direction: 'rtl'
  },
  imageButton: {
    color: '#fff',
  }
}))
