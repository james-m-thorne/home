import 'leaflet/dist/leaflet.css'
import React from 'react'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import { useStyles } from './Map.styles'
import CurrentHomes from './CurrentHomes'
import Pane from './Pane'

function Map() {
  const classes = useStyles()
  const aucklandLatLong = { lat: -36.8509, lng: 174.7645 }
  
  return (
    <div className={classes.maxHeight}>
      <MapContainer center={aucklandLatLong} zoom={13} scrollWheelZoom={true} style={{height: '100%'}} zoomControl={false}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
        />
        <Pane />
        <CurrentHomes />
        <ZoomControl position={'bottomright'} />
      </MapContainer>
    </div>
  )
}

export default Map
