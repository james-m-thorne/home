import React, { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil'
import { useMap } from 'react-leaflet'
import Card from '@material-ui/core/Card'
import SearchIcon from '@material-ui/icons/Search'
import Autocomplete from '@material-ui/lab/Autocomplete'
import InputBase from '@material-ui/core/InputBase'
import { useStyles } from './Search.styles'
import { homesState, homeDetailsState, homeRoutesState, selectedHomeState } from '../../recoil/atoms'

function Search() {
  const classes = useStyles()

  const homes = useRecoilValue(homesState)
  const resetHomeDetails = useResetRecoilState(homeDetailsState)
  const resetHomeRoutes = useResetRecoilState(homeRoutesState)

  const setSelectedHome = useSetRecoilState(selectedHomeState)
  const [value, setValue] = useState(null)
  const [options, setOptions] = useState([])
  // const [inputValue, setInputValue] = React.useState('')

  const map = useMap()

  useEffect(() => {
    if (homes) {
      let filteredHomes = homes.map(home => {
        const urlSplit = home.url.split('/')
        const address = urlSplit[3]
        const area = urlSplit[2]
        let title = ''
        if (address) {
          title = `${address.replaceAll('-', ' ')}, ${area}`
          title = title.replace(/\b\w/g, l => l.toUpperCase())
        }
        return {title: title, ...home}
      })
      filteredHomes = filteredHomes.filter(home => home.title !== '')
      setOptions(filteredHomes)
    }
  }, [homes])

  useEffect(() => {
    if (value) {
      map.flyTo({lat: value.point.lat, lng: value.point.long})
      setSelectedHome(value)
      resetHomeDetails()
      resetHomeRoutes()
    }
  }, [value, setSelectedHome, map, resetHomeDetails, resetHomeRoutes])

  // useEffect(() => {
  //   let active = true;
  //   if (inputValue.length > 2) {
  //     searchHomes(inputValue)
  //       .then(response => {
  //         if (active) {
  //           const results = response?.Results
  //           if (results) setOptions(results)
  //         }
  //       })
  //   }
  //   return () => active = false
  // }, [inputValue])

  return (
    <Card elevation={0}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <Autocomplete
          id={'search-homes'}
          value={value}
          options={options}
          getOptionLabel={(option) => option.title}
          getOptionSelected={(option, value) => option.title === value.title}
          // onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
          onChange={(_, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options)
            setValue(newValue)
          }}
          renderInput={(params) => {
            const {InputLabelProps, InputProps, ...rest} = params
            return <InputBase
              {...params.InputProps} 
              {...rest}
              placeholder="Search Homes"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          }}
        />
      </div>
    </Card>
  )
}

export default Search
