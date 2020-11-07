import './index.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Brightness3Icon from '@material-ui/icons/Brightness3'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Navbar from './navbar/Navbar'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  themeSelector: {
    position: 'absolute',
    right: 50,
    bottom: 50,
    borderRadius: '50%',
    height: 65,
    width: 65
  },
}))

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
})

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#666',
      main: '#333',
      dark: '#222',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
})

function App() {
  let [theme, setTheme] = useState(false)
  const classes = useStyles()
  const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />
  const appliedTheme = createMuiTheme(theme ? lightTheme : darkTheme)

  const handleToggleTheme = () => setTheme(!theme)

  return (
    <ThemeProvider theme={appliedTheme}>
      <Navbar>
        <Button variant="contained" className={classes.themeSelector} onClick={handleToggleTheme}>
          {icon}
        </Button>
      </Navbar>
    </ThemeProvider>
  );
}

export default App;
