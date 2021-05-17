import React from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Skeleton from '@material-ui/lab/Skeleton'
import { homeDetailsState, selectedHomeState } from '../../recoil/atoms'
import HomeData from './HomeData'
import { useStyles } from './HomeDetails.styles'

function HomeDetails() {
  const classes = useStyles()
  const homeDetails = useRecoilValue(homeDetailsState)
  const resetSelectedHome = useResetRecoilState(selectedHomeState)

  const getRouteData = (person) => (
    <Grid item xs={4} key={person.name}>
      <Typography variant={'body2'} className={classes.smallText}><b>{`${person.name} (${person.color})`}</b></Typography>
      <div>
        {person.locations.map(location =>  
          <Typography variant={'body2'} key={location.duration} className={classes.smallText}>{`${location.name} - ${location.duration / 1000 / 60} mins`}</Typography>
        )}
      </div>
    </Grid>
  )

  const routeData = () => {
    if (Object.keys(homeDetails.people).length === 0) {
      return loadingRouteData() 
    }

    return (
      <Grid container spacing={2}>
        {homeDetails.people.map(person => getRouteData(person))}
      </Grid>
    )
  }

  const loadingRouteData = () => (
    <>
      <Skeleton variant="text" />
      <Skeleton variant="rect" height={20} />
    </>
  )

  return (
    <Card elevation={0}>
      <CardContent>
        <Box display='flex' flexGrow={1}>
          <IconButton aria-label="settings" size={'small'} onClick={resetSelectedHome} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>
        <HomeData data={homeDetails.data} />
        {routeData()}
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
