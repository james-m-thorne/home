import React from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import Box from '@material-ui/core/Box'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import HomeDetails from './HomeDetails'
import Search from './Search'
import { selectedHomeState, mobileViewState, drawerOpenState } from '../../recoil/atoms'
import { useStyles } from './Pane.styles'

function Pane() {
  const classes = useStyles()
  const mobileView = useRecoilValue(mobileViewState)
  const selectedHome = useRecoilValue(selectedHomeState)
  const [drawerOpen, toggleDrawerOpen] = useRecoilState(drawerOpenState)

  const webPane = () => (
    <div className={classes.card}>
      <Search />
      {selectedHome.url && <HomeDetails />}
    </div>
  )

  const mobilePane = () => (
    <SwipeableDrawer
      anchor={'bottom'}
      open={drawerOpen}
      onClose={() => toggleDrawerOpen(false)}
      onOpen={() => toggleDrawerOpen(true)}
      BackdropProps={{invisible: true}}
      ModalProps={{keepMounted: true,}}
      classes={{paper: classes.drawer}}
    >
      <Box 
        className={classes.mobileBoxOuter}
        onTouchMove={() => toggleDrawerOpen(true)}
      >
        <Box 
          className={classes.mobileSwipe} 
          onClick={() => toggleDrawerOpen(true)} 
        >
          <Box className={classes.mobileChip}/>
        </Box>
        <Box className={classes.search}><Search /></Box>
      </Box>
      <Box className={classes.mobileBoxDetails}>
        {selectedHome.url && <HomeDetails />}
      </Box>
    </SwipeableDrawer>
  )

  const pane = mobileView ? mobilePane(): webPane()
  return pane
}

export default Pane
