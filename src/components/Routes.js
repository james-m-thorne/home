import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { useRecoilValue } from 'recoil'
import Navbar from './Navbar'
import { themeState } from '../recoil/atoms'
import { lightTheme, darkTheme } from './Routes.styles'

function Routes() {
  const theme = useRecoilValue(themeState)

  return (
    <ThemeProvider theme={createMuiTheme(theme ? darkTheme : lightTheme)}>
      <Router>
        <Navbar>
          <Switch>
            <Route path='/'>
              <div />
            </Route>
          </Switch>
        </Navbar>
      </Router>
    </ThemeProvider>
  )
}

export default Routes
