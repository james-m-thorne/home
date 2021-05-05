import './index.css'
import React from 'react'
import Routes from './components/Routes'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <Routes />
    </RecoilRoot>
  )
}

export default App
