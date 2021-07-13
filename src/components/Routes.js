import React, { useEffect } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Map from './homefinder/Map'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { mobileViewState, themeState } from '../recoil/atoms'
import { useStyles, lightTheme, darkTheme } from './Routes.styles'

function Routes() {
  const classes = useStyles()
  const theme = useRecoilValue(themeState)
  const setMobileView = useSetRecoilState(mobileViewState)

  useEffect(() => {
    setMobileView(window.innerWidth < 500)
    window.addEventListener("resize", () => setMobileView(window.innerWidth < 500))
  }, [setMobileView])

  return (
    <ThemeProvider theme={createMuiTheme(theme ? darkTheme : lightTheme)}>
      <Router>
        <div className={classes.root}>
          <main className={classes.body}>
            <Switch>
              <Route path='/'>
                <Map />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default Routes
