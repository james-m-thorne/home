import React, { useState, useEffect } from 'react'
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { homeIcon } from './HomeFinder.styles'
import * as polyUtil from 'polyline-encoded'
import { getHomes, planRoute } from '../../utils/requests'
import { PEOPLE } from '../../constants/constants'

function CurrentHomes() {
  const map = useMap()
  const encode = (bounds) => polyUtil.encode([bounds.getNorthWest(), bounds.getSouthWest(), bounds.getSouthEast(), bounds.getNorthEast(), bounds.getNorthWest()])

  const [routes, setRoutes] = useState({})
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
          const duration = await planRoute([clickedHome.lat, clickedHome.lng], location.latlng)
          return {...location, duration}
        })
  
        let locations = []
        for (let promise of locationPromises) {
          const location = await promise
          console.log(location)
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

    findRouteTimes(clickedHome).then(result => setRoutes(result))
  }, [clickedHome, people])

  useEffect(() => {
    getHomes(encodedBounds).then(fetchedHomes => {
      if (fetchedHomes?.map_items) {
        setHomes(fetchedHomes?.map_items)
      }
    })
  }, [encodedBounds])

  return (
    homes.map(home =>
      <Marker 
        key={home.id} position={[home.point.lat, home.point.long]} icon={homeIcon}
        eventHandlers={{
          click: (home) => {
            setRoutes({})
            setClickedHome(home.latlng)
          }
        }}
      >
        <Popup>
          {JSON.stringify(routes)}
        </Popup>
      </Marker>
    )
  )
}

export default CurrentHomes
