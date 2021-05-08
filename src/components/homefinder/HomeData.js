import React from 'react'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'

import HomeIcon from '@material-ui/icons/Home'
import BathtubIcon from '@material-ui/icons/Bathtub'
import HotelIcon from '@material-ui/icons/Hotel'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

const HomeData = ({ data }) => {
  if (Object.keys(data).length === 0) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}><Skeleton variant="rect" width={150} height={40} /></Grid>
        <Grid item xs={4}><Skeleton variant="circle" width={40} height={40} /></Grid>
        <Grid item xs={4}><Skeleton variant="circle" width={40} height={40} /></Grid>
        <Grid item xs={4}><Skeleton variant="circle" width={40} height={40} /></Grid>
        <Grid item xs={4}><Skeleton variant="circle" width={40} height={40} /></Grid>
        <Grid item xs={4}><Skeleton variant="circle" width={40} height={40} /></Grid>
        <Grid item xs={4}><Skeleton variant="circle" width={40} height={40} /></Grid>
      </Grid>
    )
  }

  const { 
    display_price, 
    address, 
    num_bedrooms, 
    num_bathrooms, 
    num_car_spaces, 
    display_estimated_value_short, 
    display_estimated_upper_value_short,
    display_estimated_lower_value_short,
  } = data

  const IconWithText = (icon, text) => (
    <Grid container direction="column" alignContent="center" justify="center" alignItems="center">
      <Grid item>
        {icon}
      </Grid>
      <Grid item>
        {text ? text : 'No Data'}
      </Grid>
    </Grid>
  )

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>{IconWithText(<HomeIcon fontSize={'small'}  />, address)}</Grid>
      <Grid item xs={4}>{IconWithText(<ArrowDownwardIcon fontSize={'small'} />, display_estimated_lower_value_short)}</Grid>
      { display_price ? 
        <Grid item xs={4}>{IconWithText(<AttachMoneyIcon fontSize={'small'} />, display_price)}</Grid> :
        <Grid item xs={4}>{IconWithText(<AttachMoneyIcon fontSize={'small'} />, display_estimated_value_short)}</Grid>
      }
      <Grid item xs={4}>{IconWithText(<ArrowUpwardIcon fontSize={'small'} />, display_estimated_upper_value_short)}</Grid>
      <Grid item xs={4}>{IconWithText(<HotelIcon fontSize={'small'} />, num_bedrooms)}</Grid>
      <Grid item xs={4}>{IconWithText(<BathtubIcon fontSize={'small'} />, num_bathrooms)}</Grid>
      <Grid item xs={4}>{IconWithText(<DirectionsCarIcon fontSize={'small'} />, num_car_spaces)}</Grid>
    </Grid>
  )
}

export default HomeData
