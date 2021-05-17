import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import PhoneIcon from '@material-ui/icons/Phone'
import React, { useState, useEffect } from "react"
import { useRecoilState } from 'recoil'
import { Link as RouterLink } from "react-router-dom"
import { useStyles } from "./Header.styles"
import { themeState, mobileViewState } from '../recoil/atoms'


export default function Header() {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileView, setMobileView] = useRecoilState(mobileViewState)
  const [theme, setTheme] = useRecoilState(themeState)

  const headersData = [
    {
      label: "Map",
      icon: <HomeIcon />,
      href: "/map",
    },
    {
      label: "Contact",
      icon: <PhoneIcon />,
      href: "/contact",
    },
  ]

  useEffect(() => {
    setMobileView(window.innerWidth < 500)
    window.addEventListener("resize", () => setMobileView(window.innerWidth < 500))
  }, [setMobileView])

  const logo = (
    <Typography variant="h6" component="h1" className={classes.logo}>
      Home Finder
    </Typography>
  )

  const themeIconButton = () => (
    <Switch
      onChange={() => setTheme(!theme)}
    />
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
            {headersData.map(({ label, href, icon }) => 
              <Link
                {...{
                  component: RouterLink,
                  to: href,
                  color: "inherit",
                  style: { textDecoration: "none" },
                  key: label,
                }}
              >
                <MenuItem>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{label}</ListItemText>
                </MenuItem>
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