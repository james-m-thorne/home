import React, { useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { Marker, useMap, useMapEvents } from 'react-leaflet'
import { homeIcon } from './Map.styles'
import * as polyUtil from 'polyline-encoded'
import { getHomeData, getHomes, getListingData } from '../../utils/requests'
import {
  homesState,
  homeRoutesState,
  homeDetailsState,
  selectedHomeState,
  drawerOpenState,
  filterHomeState,
  sharedHomeState, userDataState
} from '../../recoil/atoms'
import { useMutation } from '@apollo/client'
import { MUTATE_SHARED_HOME_DATA } from '../../utils/graphql'

function CurrentHomes() {
  const map = useMap()
  const [mutateSharedHomeData, ] = useMutation(MUTATE_SHARED_HOME_DATA)
  const encode = (bounds) => polyUtil.encode([bounds.getNorthWest(), bounds.getSouthWest(), bounds.getSouthEast(), bounds.getNorthEast(), bounds.getNorthWest()])

  const setDrawerOpen = useSetRecoilState(drawerOpenState)
  const resetHomeDetails = useResetRecoilState(homeDetailsState)
  const setHomeDetails = useSetRecoilState(homeDetailsState)
  const resetHomeRoutes = useResetRecoilState(homeRoutesState)
  const [selectedHome, setSelectedHome] = useRecoilState(selectedHomeState)

  const sharedHome = useRecoilValue(sharedHomeState)
  const userData = useRecoilValue(userDataState)
  const filterHomes = useRecoilValue(filterHomeState)
  const [homes, setHomes] = useRecoilState(homesState)
  const [encodedBounds, setEncodedBounds] = useState(encode(map.getBounds()))

  useMapEvents({
    moveend: () => setEncodedBounds(encode(map.getBounds()))
  })

  useEffect(() => {
    if (!selectedHome.url) return

    const findHomeDetails = async (selectedHome) => {
      const homeData = await getHomeData(selectedHome.url)
      const card = homeData.card
      if (!card) return {}

      const listingData = await getListingData(card.listing_id)
      return {...card.property_details, open_homes: listingData.listing?.open_homes}
    }

    findHomeDetails(selectedHome).then(result => setHomeDetails({data: result, url: selectedHome.url}))
  }, [selectedHome, setHomeDetails])

  useEffect(() => {
    const controller = new AbortController()
    getHomes(encodedBounds, filterHomes, controller.signal).then(fetchedHomes => {
      if (fetchedHomes?.map_items) {
        setHomes(fetchedHomes?.map_items)
      }
    })
    return () => controller.abort()
  }, [encodedBounds, setHomes, filterHomes])

  return (
    <div>
      {homes.map(home =>
        <Marker
          key={home.id}
          position={[home.point.lat, home.point.long]}
          icon={homeIcon}
          eventHandlers={{
            click: () => {
              resetHomeDetails()
              resetHomeRoutes()
              setSelectedHome(home)
              setDrawerOpen(true)
              mutateSharedHomeData({
                variables: {
                  object: {
                    property_id: home.id,
                    data_type: 'viewed',
                    shared_home_id: sharedHome.shared_home_id,
                    user_id: userData.user_id
                  }
                }
              })
            }
          }}
        />
      )}
    </div>
  )
}

export default CurrentHomes
