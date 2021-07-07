import { makeStyles } from '@material-ui/core/styles'

const drawerBleeding = 116

export const useStyles = makeStyles(() => ({
  mobileBoxOuter: {
    position: 'absolute',
    top: -drawerBleeding,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    visibility: 'visible',
    right: 0,
    left: 0,
    backgroundColor: '#fff',
    pointerEvents: 'initial'
  },
  mobileChip: {
    width: 30,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: '3px',
    position: 'absolute',
    top: 6,
    left: 'calc(50% - 15px)',
  },
  mobileSwipe: {
    width: '100%',
    height: 20,
    position: 'absolute',
  },
  mobileBoxDetails: {
    height: '100%',
    maxHeight: `calc(80vh - ${drawerBleeding}px)`,
    overflow: 'scroll'
  },
  search: {
    padding: 12,
  },
  card: {
    zIndex: 1000,
    position: 'absolute',
    margin: 20,
    width: 400,
    display: 'grid',
    gridGap: 20
  },
  drawer: {
    overflow: 'visible',
  },
  baseDrawer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 50
  }
}))
