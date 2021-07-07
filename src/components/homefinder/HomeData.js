import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import { useStyles } from './HomeDetails.styles'
import HomeIcon from '@material-ui/icons/Home'
import BathtubIcon from '@material-ui/icons/Bathtub'
import HotelIcon from '@material-ui/icons/Hotel'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

const HomeData = ({ data }) => {
  const classes = useStyles()

  const SkeletonCenter = () => (
    <Grid container direction="column" alignContent="center" justify="center" alignItems="center">
      <Skeleton variant="circle" width={50} height={50} />
    </Grid>
  )

  if (Object.keys(data).length === 0) {
    return (
      <Grid container spacing={1} alignContent="center" justify="center" alignItems="center">
        <Grid item xs={12}><Skeleton variant="rect" height={50} /></Grid>
        <Grid item xs={4}>{SkeletonCenter()}</Grid>
        <Grid item xs={4}>{SkeletonCenter()}</Grid>
        <Grid item xs={4}>{SkeletonCenter()}</Grid>
        <Grid item xs={4}>{SkeletonCenter()}</Grid>
        <Grid item xs={4}>{SkeletonCenter()}</Grid>
        <Grid item xs={4}>{SkeletonCenter()}</Grid>
        <Grid item xs={12}><Skeleton variant="rect" height={30} /></Grid>
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
    open_homes
  } = data

  const IconWithText = (icon, text) => (
    <Grid container direction="column" alignContent="center" justify="center" alignItems="center">
      <Grid item>
        {icon}
      </Grid>
      <Grid item>
        <Typography variant={'body2'}>{text ? text : 'No Data'}</Typography>
      </Grid>
    </Grid>
  )

  const showOpenHomes = () => (
    <Grid container spacing={1} justify={'space-evenly'} alignItems={'center'}>
      <Grid item xs={12}>
        <Typography align={'center'} variant={'body2'}><b>Open Homes</b></Typography>
      </Grid>
      {open_homes.map(openHome => 
        <Grid item xs={4} key={openHome.date}>
          <Typography variant={'body2'} className={classes.smallText}><b>{openHome.date}</b></Typography>
          <div>
            <Typography variant={'body2'} className={classes.smallText}>{`${openHome.start_time} - ${openHome.end_time}`}</Typography>
          </div>
        </Grid>
      )}
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
      {open_homes && <Grid item xs={12}>{showOpenHomes()}</Grid>}
    </Grid>
  )
}

export default HomeData
