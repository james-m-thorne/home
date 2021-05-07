import React from 'react'
import { Popup } from 'react-leaflet'
import Skeleton from '@material-ui/lab/Skeleton'

function HomePopup({ peopleRoutes }) {

  const personGroup = (person) => (
    <div key={person.name}>
      <b>{`${person.name} (${person.color})`}</b>
      <div>
        {person.locations.map(location =>  
          <span key={location.duration}>{`${location.name} - ${location.duration / 1000 / 60} mins`}</span>
        )}
      </div>
    </div>
  )

  const loading = () => (
    <div>
      <Skeleton variant="text" />
      <Skeleton variant="rect" width={250} height={100} />
      <Skeleton variant="text" />
      <Skeleton variant="rect" width={250} height={50} />
    </div>
  )
  
  return (
    <Popup>
      { Object.keys(peopleRoutes).length !== 0 ? 
        peopleRoutes.map(person => personGroup(person))
        : loading() }
    </Popup>
  )
}

export default HomePopup
