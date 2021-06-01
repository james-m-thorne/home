import { createMuiTheme } from '@material-ui/core/styles'
import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  body: {
    flex: 'auto'
  }
}))

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#fff',
      dark: '#ccc',
      contrastText: '#000',
    },
    secondary: {
      light: '#666',
      main: '#333',
      dark: '#222',
      contrastText: '#fff',
    },
  },
})

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#666',
      main: '#333',
      dark: '#222',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#ccc',
      contrastText: '#000',
    },
  },
})