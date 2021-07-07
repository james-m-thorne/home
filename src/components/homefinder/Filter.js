import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import Grid from '@material-ui/core/Grid'
import FilterButton from './FilterButton'
import { filterHomeState, sharedHomeState } from '../../recoil/atoms'
import BathtubIcon from '@material-ui/icons/Bathtub'
import HotelIcon from '@material-ui/icons/Hotel'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import { useMutation } from '@apollo/client'
import { MUTATE_FILTER } from '../../utils/graphql'

function Filter() {
  const [filterHomes, setFilterHomes] = useRecoilState(filterHomeState)
  const sharedHome = useRecoilValue(sharedHomeState)
  const [mutateFilter, ] = useMutation(MUTATE_FILTER)

  const updateFilter = (newValue) => {
    setFilterHomes(newValue)
    mutateFilter({
      variables: {
        shared_home_id: sharedHome.shared_home_id,
        set: newValue
      }
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <FilterButton 
          icon={<AttachMoneyIcon fontSize={'small'} />} 
          min={0} 
          max={2} 
          step={0.1} 
          suffix={'M'} 
          defaultValue={[filterHomes.min_price / 1000000, filterHomes.max_price / 1000000]}
          setFilter={(price) => updateFilter({...filterHomes, min_price: price[0] * 1000000, max_price: price[1] * 1000000})}
        />
      </Grid>
      <Grid item xs={3}>
        <FilterButton 
          icon={<HotelIcon fontSize={'small'} />}
          min={1}
          max={4}
          step={1}
          defaultValue={[filterHomes.min_bedrooms, filterHomes.max_bedrooms]}
          setFilter={(bed) => updateFilter({...filterHomes, min_bedrooms: bed[0], max_bedrooms: bed[1]})}
        />
      </Grid>
      <Grid item xs={3}>
        <FilterButton 
          icon={<BathtubIcon fontSize={'small'} />}
          min={1}
          max={4}
          step={1}
          defaultValue={[filterHomes.min_bathrooms, filterHomes.max_bathrooms]}
          setFilter={(bath) => updateFilter({...filterHomes, min_bathrooms: bath[0], max_bathrooms: bath[1]})}
        />
      </Grid>
      <Grid item xs={3}>
        <FilterButton
          icon={<DirectionsCarIcon fontSize={'small'} />}
          min={1}
          max={4}
          step={1}
          defaultValue={[filterHomes.min_carparks, filterHomes.max_carparks]}
          setFilter={(car) => updateFilter({...filterHomes, min_carparks: car[0], max_carparks: car[1]})}
        />
      </Grid>
    </Grid>
  )
}

export default Filter
