import React, { useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { Marker, Polyline, useMap, useMapEvents } from 'react-leaflet'
import { homeIcon } from './Map.styles'
import * as polyUtil from 'polyline-encoded'
import { planRoute, getHomeData, getHomes } from '../../utils/requests'
import { homesState, peopleState, homeRoutesState, homeDetailsState, selectedHomeState } from '../../recoil/atoms'

function CurrentHomes() {
  const map = useMap()
  const encode = (bounds) => polyUtil.encode([bounds.getNorthWest(), bounds.getSouthWest(), bounds.getSouthEast(), bounds.getNorthEast(), bounds.getNorthWest()])

  const resetHomeDetails = useResetRecoilState(homeDetailsState)
  const setHomeDetails = useSetRecoilState(homeDetailsState)
  const resetHomeRoutes = useResetRecoilState(homeRoutesState)
  const [homeRoutes, setHomeRoutes] = useRecoilState(homeRoutesState)
  const [selectedHome, setSelectedHome] = useRecoilState(selectedHomeState)

  const people = useRecoilValue(peopleState)
  const [homes, setHomes] = useRecoilState(homesState)
  const [encodedBounds, setEncodedBounds] = useState(encode(map.getBounds()))

  useMapEvents({
    moveend: () => setEncodedBounds(encode(map.getBounds()))
  })

  useEffect(() => {
    if (!selectedHome.url) return

    const findRouteDetails = async (selectedHome) => {
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

      return peopleDetails
    }

    findRouteDetails(selectedHome).then(result => setHomeRoutes(result))
  }, [selectedHome, setHomeRoutes, people])

  useEffect(() => {
    if (!selectedHome.url) return

    const findHomeDetails = async (selectedHome) => {
      const homeData = await getHomeData(selectedHome.url)
      return homeData.card?.property_details
    }

    findHomeDetails(selectedHome).then(result => setHomeDetails({data: result, url: selectedHome.url}))
  }, [selectedHome, setHomeDetails])

  useEffect(() => {
    getHomes(encodedBounds).then(fetchedHomes => {
      if (fetchedHomes?.map_items) {
        setHomes(fetchedHomes?.map_items)
      }
    })
  }, [encodedBounds, setHomes])

  const getMarkers = () => (
    homes.map(home =>
      <Marker 
        key={home.id} 
        position={[home.point.lat, home.point.long]} 
        icon={homeIcon}
        eventHandlers={{
          click: () => {
            resetHomeDetails()
            resetHomeRoutes()
            setSelectedHome(home)
          }
        }}
      />
    )
  )

  const getLines = () => (
    homeRoutes.map(person => (
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
