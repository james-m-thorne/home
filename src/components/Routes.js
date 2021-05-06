import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Header from './Header'
import HomeFinder from './homefinder/HomeFinder'
import { useRecoilValue } from 'recoil'
import { themeState } from '../recoil/atoms'
import { useStyles, lightTheme, darkTheme } from './Routes.styles'

function Routes() {
  const classes = useStyles()
  const theme = useRecoilValue(themeState)

  return (
    <ThemeProvider theme={createMuiTheme(theme ? darkTheme : lightTheme)}>
      <Router>
        <div className={classes.root}>
          <Header />
          <main className={classes.body}>
            <Switch>
              <Route path='/'>
                <HomeFinder />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default Routes