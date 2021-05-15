import React from 'react'
import { useRecoilValue } from 'recoil'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import { useStyles } from './HomeFinder.styles'
import CurrentHomes from './CurrentHomes'
import HomeDetails from './HomeDetails'
import Search from './Search'
import { selectedHomeState } from '../../recoil/atoms'

function HomeFinder() {
  const classes = useStyles()
  const aucklandLatLong = { lat: -36.8509, lng: 174.7645 }
  const selectedHome = useRecoilValue(selectedHomeState)
  
  return (
    <div className={classes.maxHeight}>
      <MapContainer center={aucklandLatLong} zoom={13} scrollWheelZoom={true} style={{height: '100%'}} zoomControl={false}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
        />
        <div className={classes.card}>
          <Search />
          {selectedHome.url && <HomeDetails />}
        </div>
        <CurrentHomes />
        <ZoomControl position={'bottomright'} />
      </MapContainer>
    </div>
  )
}

export default HomeFinder
