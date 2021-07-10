import React, { useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { CircleMarker, useMap, useMapEvents } from 'react-leaflet'
import * as polyUtil from 'polyline-encoded'
import { getHomeData, getHomes, getListingData } from '../../utils/requests'
import {
  homesState,
  homeRoutesState,
  homeDetailsState,
  selectedHomeState,
  drawerOpenState,
  filterHomeState,
  sharedHomeState,
  userDataState,
  propertyDataState,
  loadingState
} from '../../recoil/atoms'
import { useMutation } from '@apollo/client'
import { INSERT_SHARED_HOME_DATA } from '../../utils/graphql'

function CurrentHomes() {
  const map = useMap()
  const [insertSharedHomeData, ] = useMutation(INSERT_SHARED_HOME_DATA)
  const encode = (bounds) => polyUtil.encode([bounds.getNorthWest(), bounds.getSouthWest(), bounds.getSouthEast(), bounds.getNorthEast(), bounds.getNorthWest()])

  const setDrawerOpen = useSetRecoilState(drawerOpenState)
  const setLoading = useSetRecoilState(loadingState)
  const resetHomeDetails = useResetRecoilState(homeDetailsState)
  const setHomeDetails = useSetRecoilState(homeDetailsState)
  const resetHomeRoutes = useResetRecoilState(homeRoutesState)
  const [selectedHome, setSelectedHome] = useRecoilState(selectedHomeState)

  const [propertyData, setPropertyData] = useRecoilState(propertyDataState)
  const sharedHome = useRecoilValue(sharedHomeState)
  const userData = useRecoilValue(userDataState)
  const filterHomes = useRecoilValue(filterHomeState)
  const [homes, setHomes] = useRecoilState(homesState)
  const [encodedBounds, setEncodedBounds] = useState(encode(map.getBounds()))

  useMapEvents({
    moveend: () => setEncodedBounds(encode(map.getBounds()))
  })

  const clickHome = (home) => {
    resetHomeDetails()
    resetHomeRoutes()
    setSelectedHome(home)
    setDrawerOpen(true)
    if (!propertyData.favourite.includes(home.id)) {
      setPropertyData({...propertyData, viewed: [...propertyData.viewed, home.id]})
      insertSharedHomeData({
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
  }

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
    setLoading(true)
    getHomes(encodedBounds, filterHomes, controller.signal)
      .then(fetchedHomes => {
        if (fetchedHomes?.map_items) {
          setHomes(fetchedHomes?.map_items)
          setLoading(false)
        }
      })
      .catch(() => setLoading(false))

    return () => controller.abort()
  }, [encodedBounds, setHomes, filterHomes, setLoading])

  return (
    <div>
      {homes.map(home =>
        <CircleMarker
          key={home.id}
          pathOptions={{
            radius: 6,
            opacity: 0,
            fillOpacity: 0.7,
            color: propertyData.favourite.includes(home.id) ? 'red' : (propertyData.viewed.includes(home.id) ? 'blue' : 'black')
          }}
          center={[home.point.lat, home.point.long]}
          eventHandlers={{click: () => clickHome(home)}}
        />
      )}
    </div>
  )
}

export default CurrentHomes
