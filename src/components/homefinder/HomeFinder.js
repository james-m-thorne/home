import React, { useEffect, useState, useMemo } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useStyles, homeIcon } from './HomeFinder.styles'
import staticHomes from '../../data/homes.json'

function HomeFinder() {
  const classes = useStyles()
  const [route, setRoute] = useState({})
  const aucklandLatLong = { lat: -36.8509, lng: 174.7645 }

  useEffect(() => {
    const routeResponse = fetch('https://3b83e40z07.execute-api.us-east-1.amazonaws.com/plan?from=1020A%20New%20North%20Road%2C%20Mount%20Albert&to=96%20St%20Georges%20Bay%20Road%2C%20Parnell&fromLoc=-36.88740921,174.71380615&toLoc=-36.85244751,174.78210449&timeMode=A&date=2021-05-06T18%3A58%2B12%3A00&modes=BUS,TRAIN,FERRY&operators=&optimize=QUICK&maxWalk=1000&maxChanges=-1&routes=&showExternalProviders=true&subscription-key=693150c317fc42c5a2f871aee3f586af')
      .then(response => response.json())
    setRoute(routeResponse)
  }, [])

  const getHomeMarkers = useMemo(() => {
    return staticHomes.map_items.map(home =>
      <Marker key={home.id} position={[home.point.lat, home.point.long]} icon={homeIcon}>
        <Popup>
          {home.url}
        </Popup>
      </Marker>
    )
  }, [])

  console.log(route)
  

  return (
    <div className={classes.maxHeight}>
      <MapContainer center={aucklandLatLong} zoom={13} scrollWheelZoom={true} className={classes.maxHeight}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {getHomeMarkers}
      </MapContainer>
    </div>
  )
}

export default HomeFinder
