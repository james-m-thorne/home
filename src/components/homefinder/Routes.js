import React, { useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { Polyline } from 'react-leaflet'
import * as polyUtil from 'polyline-encoded'
import { planRoute } from '../../utils/requests'
import { peopleState, homeRoutesState, selectedHomeState } from '../../recoil/atoms'

function Routes() {
  const [homeRoutes, setHomeRoutes] = useRecoilState(homeRoutesState)
  const selectedHome = useRecoilValue(selectedHomeState)
  const people = useRecoilValue(peopleState)

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
      {getLines()}
    </div>
  )
}

export default Routes
