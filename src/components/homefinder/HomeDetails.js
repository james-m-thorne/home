import React from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import { mobileViewState, homeDetailsState, selectedHomeState } from '../../recoil/atoms'
import HomeData from './HomeData'
import RouteData from './RouteData'
import { useStyles } from './HomeDetails.styles'

function HomeDetails() {
  const classes = useStyles()
  const mobileView = useRecoilValue(mobileViewState)
  const homeDetails = useRecoilValue(homeDetailsState)
  const resetSelectedHome = useResetRecoilState(selectedHomeState)

  return (
    <Card elevation={0}>
      <CardContent>
        {!mobileView && <Box display='flex' flexGrow={1}>
          <IconButton aria-label="settings" size={'small'} onClick={resetSelectedHome} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>}
        <HomeData data={homeDetails.data} />
        <RouteData />
      </CardContent>
      <CardActions>
        {
          homeDetails.url && <Button variant='contained' href={`https://homes.co.nz/address${homeDetails.url}`} target="_blank" fullWidth>View</Button>
        }
      </CardActions>
    </Card>
  )
}

export default HomeDetails
