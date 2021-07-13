import './index.css'
import React from 'react'
import Routes from './components/Routes'
import { RecoilRoot } from 'recoil'
import Amplify, { Auth } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { API_URL } from './constants/constants'
import { setContext } from '@apollo/client/link/context'

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_3VX8Mxn6E',
    userPoolWebClientId: 'qsvjf04usi7dglbh1mn69rto',
    mandatorySignIn: false,
    authenticationFlowType: 'USER_SRP_AUTH',
  }
})

const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
})

const authLink = setContext(async (_, { headers }) => {
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
  cache: new InMemoryCache({
    addTypename: false
  })
})

function App() {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <Routes/>
      </ApolloProvider>
    </RecoilRoot>
  )
}

export default withAuthenticator(App)
