import { makeStyles } from '@material-ui/core/styles'
import homeSvg from '../../data/homeSvg.svg'
import L from 'leaflet'

const homeIcon = new L.Icon({
    iconUrl: homeSvg,
    iconRetinaUrl: homeSvg,
    iconSize: new L.Point(10, 10),
})

export { homeIcon }

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  maxHeight: {
    height: '100%'
  },
  card: {
    zIndex: 1000,
    position: 'absolute',
    margin: 20,
    maxWidth: 350
  }
}))
