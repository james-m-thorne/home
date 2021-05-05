import React from 'react'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import MenuIcon from '@material-ui/icons/Menu'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Brightness3Icon from '@material-ui/icons/Brightness3'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Home from '@material-ui/icons/Home'
import Mail from '@material-ui/icons/Mail'
import {
  SwipeableDrawer, AppBar, Toolbar, List, ListItem, ListItemText,
  CssBaseline, Divider, IconButton
} from '@material-ui/core'
import { useStyles } from './Navbar.styles'
import { Button } from '@material-ui/core'
import { useRecoilState } from 'recoil'
import { themeState } from '../recoil/atoms'

export default function Navbar(props) {
  const classes = useStyles()
  const history = useHistory()
  const [open, setOpen] = React.useState(false)
  const [theme, setTheme] = useRecoilState(themeState)

  const handleDrawerClose = () => setOpen(false)
  const handleDrawerOpen = () => setOpen(true)

  const sideBarIcons = {
    'Shared Home Finder': {icon: <Home/>, route: 'homefinder'}
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        variant="permanent"
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        swipeAreaWidth={50}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {Object.entries(sideBarIcons).map(([text, data]) => (
            <ListItem button key={text} onClick={() => history.push(data.route)}>
              <ListItemIcon className={classes.menuIcon}>
                {data.icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <main className={classes.content} onClick={open ? handleDrawerClose : undefined}>
        <div className={classes.toolbar} />
        {props.children}
        <Button variant="contained" className={classes.themeSelector} onClick={() => setTheme(!theme)}>
          {!theme ? <Brightness7Icon /> : <Brightness3Icon />}
        </Button>
      </main>
    </div>
  )
}