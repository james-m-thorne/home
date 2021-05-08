import React from 'react'
import { useRecoilValue } from 'recoil'
import { Popup } from 'react-leaflet'
import Button from '@material-ui/core/Button'
import Skeleton from '@material-ui/lab/Skeleton'
import { homeDetailsState } from '../../recoil/atoms'
import HomeData from './HomeData'

function HomePopup() {

  const homeDetails = useRecoilValue(homeDetailsState)

  const getRouteData = (person) => (
    <div key={person.name}>
      <b>{`${person.name} (${person.color})`}</b>
      <div>
        {person.locations.map(location =>  
          <span key={location.duration}>{`${location.name} - ${location.duration / 1000 / 60} mins`}</span>
        )}
      </div>
    </div>
  )

  const loadingRouteData = () => (
    <div>
      <Skeleton variant="text" />
      <Skeleton variant="rect" width={150} height={15} />
      <Skeleton variant="text" />
      <Skeleton variant="rect" width={150} height={15} />
      <Skeleton variant="text" />
      <Skeleton variant="rect" width={150} height={15} />
    </div>
  )

  return (
    <Popup>
      <HomeData data={homeDetails.data} />
      { 
        Object.keys(homeDetails.people).length !== 0 ? 
          homeDetails.people.map(person => getRouteData(person))
          : loadingRouteData() 
      }
      {
        homeDetails.url && <Button variant='contained' href={`https://homes.co.nz/address${homeDetails.url}`} target="_blank" fullWidth>View</Button>
      }
    </Popup>
  )
}

export default HomePopup
