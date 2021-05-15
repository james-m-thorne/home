import React from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
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
    <div key={person.name}>
      <b>{`${person.name} (${person.color})`}</b>
      <div>
        {person.locations.map(location =>  
          <span key={location.duration}>{`${location.name} - ${location.duration / 1000 / 60} mins`}</span>
        )}
      </div>
    </div>
  )

  const loadingRouteData = () => (
    <div>
      <Skeleton variant="text" />
      <Skeleton variant="rect" height={20} />
      <Skeleton variant="text" />
      <Skeleton variant="rect" height={20} />
      <Skeleton variant="text" />
      <Skeleton variant="rect" height={20} />
    </div>
  )

  return (
    <Card className={classes.card}>
      <CardContent>
        <Box display='flex' flexGrow={1}>
          <IconButton aria-label="settings" size={'small'} onClick={resetSelectedHome} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>
        <HomeData data={homeDetails.data} />
        { 
          Object.keys(homeDetails.people).length !== 0 ? 
            homeDetails.people.map(person => getRouteData(person))
            : loadingRouteData() 
        }
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
