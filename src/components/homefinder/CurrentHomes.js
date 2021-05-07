import React, { useState, useEffect } from 'react'
import { Marker, Polyline, useMap, useMapEvents } from 'react-leaflet'
import { homeIcon } from './HomeFinder.styles'
import HomePopup from './HomePopup'
import * as polyUtil from 'polyline-encoded'
import { getHomes, planRoute } from '../../utils/requests'
import { PEOPLE } from '../../constants/constants'

function CurrentHomes() {
  const map = useMap()
  const encode = (bounds) => polyUtil.encode([bounds.getNorthWest(), bounds.getSouthWest(), bounds.getSouthEast(), bounds.getNorthEast(), bounds.getNorthWest()])

  const [peopleRoutes, setPeopleRoutes] = useState([])
  const [homes, setHomes] = useState([])
  const [clickedHome, setClickedHome] = useState()
  const [encodedBounds, setEncodedBounds] = useState(encode(map.getBounds()))
  const [people, setPeople] = useState(PEOPLE)

  useMapEvents({
    moveend: () => setEncodedBounds(encode(map.getBounds()))
  })

  useEffect(() => {
    if (!clickedHome) return

    const findRouteTimes = async (clickedHome) => {
      const personPromises = people.map(async (person) => {
        const locationPromises = person.locations.map(async (location) => {
          const firstRoute = await planRoute([clickedHome.lat, clickedHome.lng], location.latlng)
          return {...location, ...firstRoute}
        })
  
        let locations = []
        for (let promise of locationPromises) {
          const location = await promise
          locations.push(location)
        }
        return {...person, locations}
      })
  
      let peopleWithTimes = []
      for (let promise of personPromises) {
        const person = await promise
        peopleWithTimes.push(person)
      }
      return peopleWithTimes
    }

    findRouteTimes(clickedHome).then(result => setPeopleRoutes(result))
  }, [clickedHome, people])

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
        key={home.id} position={[home.point.lat, home.point.long]} icon={homeIcon}
        eventHandlers={{
          click: (home) => {
            setPeopleRoutes([])
            setClickedHome(home.latlng)
          }
        }}
      >
        <HomePopup peopleRoutes={peopleRoutes} />
      </Marker>
    )
  )

  const getLines = () => (
    peopleRoutes.map(person => (
      person.locations.map(location => (
        location.legs.map(leg => {
          const geometry = polyUtil.decode(leg.geometry)
          return <Polyline key={leg.geometry} positions={geometry} color={person.color} />
        })
      ))
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
