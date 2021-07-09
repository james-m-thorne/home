import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Card } from '@material-ui/core'
import { useRecoilValue } from 'recoil'
import { loadingState } from '../../recoil/atoms'

function Loader() {
  const loading = useRecoilValue(loadingState)

  if (!loading) {
    return <div />
  }

  return (
    <div style={{display: 'flex', alignItems: 'top', justifyContent: 'center', zIndex: 1000, position: 'absolute', width: '100%'}}>
      <Card style={{marginTop: 20, width: 60, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <CircularProgress size={30}/>
      </Card>
    </div>
  )
}

export default Loader
