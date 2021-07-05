import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useQuery } from '@apollo/client'
import Grid from '@material-ui/core/Grid'
import FilterButton from './FilterButton'
import { filterHomeState } from '../../recoil/atoms'
import BathtubIcon from '@material-ui/icons/Bathtub'
import HotelIcon from '@material-ui/icons/Hotel'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import { GET_FILTERS } from '../../utils/graphql'

function Filter() {
  const [filterHomes, setFilterHomes] = useRecoilState(filterHomeState)
  const filterResult = useQuery(GET_FILTERS)

  const [price, setPrice] = useState([filterHomes.priceMin / 1000000, filterHomes.priceMax / 1000000])
  const [bed, setBed] = useState([filterHomes.bedMin, filterHomes.bedMax])
  const [bath, setBath] = useState([filterHomes.bathMin, filterHomes.bathMax])
  const [car, setCar] = useState([filterHomes.carMin, filterHomes.carMax])

  useEffect(() => {
    if (filterResult.data) {
      const filterData = filterResult.data.shared_home_filters[0]
      setPrice([filterData.min_price / 1000000, filterData.max_price / 1000000])
      setBed([filterData.min_bedrooms, filterData.max_bedrooms])
      setBath([filterData.min_bathrooms, filterData.max_bathrooms])
      setCar([filterData.min_carparks, filterData.max_carparks])
    } else if (filterResult.error) {
      console.error(filterResult.error)
    }
  }, [filterResult])

  useEffect(() => {
    setFilterHomes({
      priceMin: price[0] * 1000000, priceMax: price[1] * 1000000,
      bedMin: bed[0], bedMax: bed[1],
      bathMin: bath[0], bathMax: bath[1],
      carMin: car[0], carMax: car[1],
    })
  }, [setFilterHomes, price, bed, bath, car])

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <FilterButton 
          icon={<AttachMoneyIcon fontSize={'small'} />} 
          min={0} 
          max={2} 
          step={0.1} 
          suffix={'M'} 
          defaultValue={price}
          setFilter={setPrice}
        />
      </Grid>
      <Grid item xs={3}>
        <FilterButton 
          icon={<HotelIcon fontSize={'small'} />}
          min={1}
          max={4}
          step={1}
          defaultValue={bed}
          setFilter={setBed}
        />
      </Grid>
      <Grid item xs={3}>
        <FilterButton 
          icon={<BathtubIcon fontSize={'small'} />}
          min={1}
          max={4}
          step={1}
          defaultValue={bath}
          setFilter={setBath}
        />
      </Grid>
      <Grid item xs={3}>
        <FilterButton
          icon={<DirectionsCarIcon fontSize={'small'} />}
          min={1}
          max={4}
          step={1}
          defaultValue={car}
          setFilter={setCar}
        />
      </Grid>
    </Grid>
  )
}

export default Filter
