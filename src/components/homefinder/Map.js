import 'leaflet/dist/leaflet.css'
import React, { useEffect } from 'react'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import { useStyles } from './Map.styles'
import CurrentHomes from './CurrentHomes'
import Routes from './Routes'
import Pane from './Pane'
import { useQuery } from '@apollo/client'
import { GET_SHARED_HOME_INFO } from '../../utils/graphql'
import { useSetRecoilState } from 'recoil'
import { filterHomeState, sharedHomeState, userDataState, propertyDataState } from '../../recoil/atoms'
import Loader from './Loader'

function Map() {
  const classes = useStyles()
  const aucklandLatLong = { lat: -36.8509, lng: 174.7645 }

  const setPropertyData = useSetRecoilState(propertyDataState)
  const setFilterHomes = useSetRecoilState(filterHomeState)
  const setSharedHome = useSetRecoilState(sharedHomeState)
  const setUserData = useSetRecoilState(userDataState)
  const sharedHomeInfo = useQuery(GET_SHARED_HOME_INFO)

  useEffect(() => {
    if (sharedHomeInfo.data) {
      setFilterHomes(sharedHomeInfo.data.shared_home_filters[0])
      setSharedHome(sharedHomeInfo.data.shared_homes[0])
      setUserData(sharedHomeInfo.data.users[0])

      const viewedProperties = sharedHomeInfo.data.shared_home_data.filter(data => data.data_type === 'viewed').map(data => data.property_id)
      const favouriteProperties = sharedHomeInfo.data.shared_home_data.filter(data => data.data_type === 'favourite').map(data => data.property_id)
      setPropertyData({viewed: viewedProperties, favourite: favouriteProperties})
    } else if (sharedHomeInfo.error) {
      console.error(sharedHomeInfo.error)
    }
  }, [sharedHomeInfo, setFilterHomes, setSharedHome, setUserData, setPropertyData])
  
  return (
    <div className={classes.maxHeight}>
      <MapContainer center={aucklandLatLong} zoom={13} scrollWheelZoom={true} style={{height: '100%'}} zoomControl={false}>
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" />
        <Pane />
        <Loader />
        <CurrentHomes />
        <Routes />
        <ZoomControl position={'topright'} />
      </MapContainer>
    </div>
  )
}

export default Map
