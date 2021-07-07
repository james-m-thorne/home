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
import { filterHomeState } from '../../recoil/atoms'

function Map() {
  const classes = useStyles()
  const aucklandLatLong = { lat: -36.8509, lng: 174.7645 }

  const setFilterHomes = useSetRecoilState(filterHomeState)
  const sharedHomeInfo = useQuery(GET_SHARED_HOME_INFO)

  useEffect(() => {
    if (sharedHomeInfo.data) {
      const filterData = sharedHomeInfo.data.shared_home_filters[0]
      setFilterHomes(filterData)
    } else if (sharedHomeInfo.error) {
      console.error(sharedHomeInfo.error)
    }
  }, [sharedHomeInfo, setFilterHomes])
  
  return (
    <div className={classes.maxHeight}>
      <MapContainer center={aucklandLatLong} zoom={13} scrollWheelZoom={true} style={{height: '100%'}} zoomControl={false}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
        />
        <Pane />
        <CurrentHomes />
        <Routes />
        <ZoomControl position={'topright'} />
      </MapContainer>
    </div>
  )
}

export default Map
