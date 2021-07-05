import './index.css'
import React from 'react'
import Routes from './components/Routes'
import { RecoilRoot } from 'recoil'
import Amplify from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_3VX8Mxn6E',
    userPoolWebClientId: 'qsvjf04usi7dglbh1mn69rto',
    mandatorySignIn: false,
    authenticationFlowType: 'USER_SRP_AUTH',
  }
})

function App() {
  return (
    <RecoilRoot>
      <Routes/>
    </RecoilRoot>
  )
}

export default withAuthenticator(App)
