import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Card } from '@material-ui/core'
import { useRecoilValue } from 'recoil'
import { loadingState } from '../../recoil/atoms'
import { useStyles } from './Loader.styles'

function Loader() {
  const classes = useStyles()
  const loading = useRecoilValue(loadingState)

  if (!loading) {
    return <div />
  }

  return (
    <div className={classes.loader}>
      <Card className={classes.loaderCard}>
        <CircularProgress size={30}/>
      </Card>
    </div>
  )
}

export default Loader
