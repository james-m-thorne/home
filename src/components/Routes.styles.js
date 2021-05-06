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

export const darkTheme = createMuiTheme({
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