import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import Box from '@material-ui/core/Box'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import HomeDetails from './HomeDetails'
import Search from './Search'
import { selectedHomeState, mobileViewState } from '../../recoil/atoms'
import { useStyles } from './Pane.styles'

function Pane() {
  const classes = useStyles()
  const mobileView = useRecoilValue(mobileViewState)
  const selectedHome = useRecoilValue(selectedHomeState)
  const [drawerOpen, toggleDrawerOpen] = useState(false)

  const paneChildren = () => (
    <>
      <Search />
      {selectedHome.url && <HomeDetails />}
    </>
  )
  
  const webPane = () => (
    <div className={classes.card}>
      {paneChildren()}
    </div>
  )

  console.log(classes.root)

  const mobilePane = () => (
    <SwipeableDrawer
      anchor={'bottom'}
      open={drawerOpen}
      onClose={() => toggleDrawerOpen(false)}
      onOpen={() => toggleDrawerOpen(true)}
      // swipeAreaWidth={50}
      BackdropProps={{invisible: true}}
      disableBackdropTransition
      ModalProps={{
        keepMounted: true,
      }}
      classes={{
        paper: classes.drawer
      }}
    >
      <Box className={classes.mobileBoxOuter}>
        <Box className={classes.mobileSwipe} onClick={() => toggleDrawerOpen(true)}>
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
