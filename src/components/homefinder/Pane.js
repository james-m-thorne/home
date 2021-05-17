import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import HomeDetails from './HomeDetails'
import Search from './Search'
import { selectedHomeState, mobileViewState } from '../../recoil/atoms'
import { useStyles } from './Pane.styles'

function Pane() {
  const classes = useStyles()
  const mobileView = useRecoilValue(mobileViewState)
  const selectedHome = useRecoilValue(selectedHomeState)
  const [drawerOpen, toggleDrawerOpen] = useState(true)

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

  const mobilePane = () => (
    <SwipeableDrawer
      classes={{
        paper: classes.drawer
      }}
      variant={'permanent'}
      swipeAreaWidth={50}
      BackdropProps={{invisible: true}}
      disableBackdropTransition
      anchor={'bottom'}
      open={drawerOpen}
      onClose={() => toggleDrawerOpen(false)}
      onOpen={() => toggleDrawerOpen(true)}
    >
      {paneChildren()}
    </SwipeableDrawer>
  )

  const pane = mobileView ? mobilePane(): webPane()
  return pane
}

export default Pane
