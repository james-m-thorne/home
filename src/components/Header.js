import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from "@material-ui/core"
import Brightness3Icon from '@material-ui/icons/Brightness3'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import MenuIcon from "@material-ui/icons/Menu"
import React, { useState, useEffect } from "react"
import { useRecoilState } from 'recoil'
import { Link as RouterLink } from "react-router-dom"
import { useStyles } from "./Header.styles"
import { themeState } from '../recoil/atoms'


export default function Header() {
  const classes = useStyles()
  const [mobileView, setMobileView] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [theme, setTheme] = useRecoilState(themeState)

  const headersData = [
    {
      label: "Home Finder",
      href: "/homefinder",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ]

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900 ? setMobileView(true) : setMobileView(false)
    }
    setResponsiveness()
    window.addEventListener("resize", () => setResponsiveness())
  }, [])

  const logo = (
    <Typography variant="h6" component="h1" className={classes.logo}>
      Thorney
    </Typography>
  )

  const themeIconButton = () => (
    <IconButton
      color="inherit"
      className={classes.menuButton}
      onClick={() => setTheme(!theme)}
    >
      {!theme ? <Brightness7Icon /> : <Brightness3Icon />}
    </IconButton>
  )

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar}>
        {logo}
        <div>
          {headersData.map(({ label, href }) => 
            <Button
              {...{
                key: label,
                color: "inherit",
                to: href,
                component: RouterLink,
                className: classes.menuButton,
              }}
            >
              {label}
            </Button>
          )}
          {themeIconButton()}
        </div>
      </Toolbar>
    )
  }

  const displayMobile = () => {
    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: () => setDrawerOpen(true),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: () => setDrawerOpen(false),
          }}
        >
          <div className={classes.drawerContainer}>
            {headersData.map(({ label, href }) => 
              <Link
                {...{
                  component: RouterLink,
                  to: href,
                  color: "inherit",
                  style: { textDecoration: "none" },
                  key: label,
                }}
              >
                <MenuItem>{label}</MenuItem>
              </Link>
            )}
          </div>
        </Drawer>
        <div>{logo}</div>
        <div style={{marginLeft: 'auto'}}>{themeIconButton()}</div>
      </Toolbar>
    )
  }

  return (
    <AppBar className={classes.header}>
      {mobileView ? displayMobile() : displayDesktop()}
    </AppBar>
  )
}