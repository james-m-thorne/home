import React from 'react'
import { useRecoilValue } from 'recoil'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import { homeRoutesState } from '../../recoil/atoms'
import { useStyles } from './HomeDetails.styles'

function RouteData() {
  const classes = useStyles()
  const homeRoutes = useRecoilValue(homeRoutesState)

  const loadingRouteData = () => (
    <>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="rect" height={25} />
    </>
  )

  if (Object.keys(homeRoutes).length === 0) {
    return loadingRouteData() 
  }

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align={'center'} variant={'body2'}><b>Selected Routes</b></Typography>
      </Grid>
      {homeRoutes.map(person => getRouteData(person))}
    </Grid>
  )
}

export default RouteData
