import React, { useState, useEffect } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { Marker, Polyline, useMap, useMapEvents } from 'react-leaflet'
import { homeIcon } from './Map.styles'
import * as polyUtil from 'polyline-encoded'
import { planRoute, getHomeData, getHomes } from '../../utils/requests'
import { PEOPLE } from '../../constants/constants'
import { homeDetailsState, selectedHomeState } from '../../recoil/atoms'

function CurrentHomes() {
  const map = useMap()
  const encode = (bounds) => polyUtil.encode([bounds.getNorthWest(), bounds.getSouthWest(), bounds.getSouthEast(), bounds.getNorthEast(), bounds.getNorthWest()])

  const resetHomeDetails = useResetRecoilState(homeDetailsState)
  const [homeDetails, setHomeDetails] = useRecoilState(homeDetailsState)
  const [selectedHome, setSelectedHome] = useRecoilState(selectedHomeState)

  const [people, setPeople] = useState(PEOPLE)
  const [homes, setHomes] = useState([])
  const [encodedBounds, setEncodedBounds] = useState(encode(map.getBounds()))

  useMapEvents({
    moveend: () => setEncodedBounds(encode(map.getBounds()))
  })

  useEffect(() => {
    if (!selectedHome.url) return

    const findHomeDetails = async (selectedHome) => {
      const homeDataPromise = getHomeData(selectedHome.url)
  
      const personPromises = people.map(async (person) => {
        const locationPromises = person.locations.map(async (location) => {
          const firstRoute = await planRoute([selectedHome.point.lat, selectedHome.point.long], location.latlng)
          return {...location, ...firstRoute}
        })
  
        let locations = []
        for (let promise of locationPromises) {
          const location = await promise
          locations.push(location)
        }
        return {...person, locations}
      })
  
      let peopleDetails = []
      for (let promise of personPromises) {
        const person = await promise
        peopleDetails.push(person)
      }
  
      const homeData = await homeDataPromise
      return {data: homeData.card?.property_details, people: peopleDetails}
    }

    findHomeDetails(selectedHome).then(result => setHomeDetails({...result, url: selectedHome.url}))
  }, [selectedHome, people])

  useEffect(() => {
    getHomes(encodedBounds).then(fetchedHomes => {
      if (fetchedHomes?.map_items) {
        setHomes(fetchedHomes?.map_items)
      }
    })
  }, [encodedBounds])

  const getMarkers = () => (
    homes.map(home =>
      <Marker 
        key={home.id} 
        position={[home.point.lat, home.point.long]} 
        icon={homeIcon}
        eventHandlers={{
          click: () => {
            resetHomeDetails()
            setSelectedHome(home)
          }
        }}
      />
    )
  )

  const getLines = () => (
    homeDetails.people.map(person => (
      person.locations.map(location => {
        const legs = location?.legs
        if (legs) {
          return location.legs.map(leg => {
            const geometry = polyUtil.decode(leg.geometry)
            return <Polyline key={leg.geometry} positions={geometry} color={person.color} />
          })
        }
        return null
      })
    ))
  )

  return (
    <div>
      {getMarkers()}
      {getLines()}
    </div>
  )
}

export default CurrentHomes
