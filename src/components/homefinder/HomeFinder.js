import React from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useStyles } from './HomeFinder.styles'
import CurrentHomes from './CurrentHomes'

function HomeFinder() {
  const classes = useStyles()
  const aucklandLatLong = { lat: -36.8509, lng: 174.7645 }
  
  return (
    <div className={classes.maxHeight}>
      <MapContainer center={aucklandLatLong} zoom={13} scrollWheelZoom={true} style={{height: '100%'}}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
        />
        <CurrentHomes />
      </MapContainer>
    </div>
  )
}

export default HomeFinder
