import './index.css'
import React from 'react'
import Routes from './components/Routes'
import { RecoilRoot } from 'recoil'
import Amplify, { Auth } from 'aws-amplify'
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
  React.useEffect(() => {
    Auth.currentSession().then(res => {
      let accessToken = res.getAccessToken()
      let jwt = accessToken.getJwtToken()
      //You can print them to see the full objects
      console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
      console.log(`myJwt: ${jwt}`)
    })
  }, [])

  return (
    <RecoilRoot>
      <Routes/>
    </RecoilRoot>
  )
}

export default withAuthenticator(App)
