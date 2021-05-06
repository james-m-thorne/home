import React, { useEffect, useState } from 'react'
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
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CurrentHomes />
      </MapContainer>
    </div>
  )
}

export default HomeFinder
