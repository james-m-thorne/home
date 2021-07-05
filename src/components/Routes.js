import React, { useEffect } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from './Header'
import Map from './homefinder/Map'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { themeState, userDataState } from '../recoil/atoms'
import { useStyles, lightTheme, darkTheme } from './Routes.styles'
import { API_URL } from '../constants/constants'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Auth } from 'aws-amplify'

const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
})

const authLink = setContext(async (_, { headers }) => {
  // console.log(useRecoilValue(userDataState))
  // get the authentication token from local storage if it exists
  const token = (await Auth.currentSession()).getIdToken().getJwtToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


function Routes() {
  const classes = useStyles()
  const theme = useRecoilValue(themeState)
  const setUserData = useSetRecoilState(userDataState)

  useEffect(() => {
    Auth.currentSession().then(res => {
      const idToken = res.getIdToken()
      const payload = idToken.decodePayload()
      setUserData({
        idToken: idToken.getJwtToken(),
        email: payload['cognito:username']
      })
    })
  }, [setUserData])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={createMuiTheme(theme ? darkTheme : lightTheme)}>
        <Router>
          <div className={classes.root}>
            <Header />
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
    </ApolloProvider>
  )
}

export default Routes
