import React from 'react'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { useMutation } from '@apollo/client'
import { INSERT_SHARED_HOME_DATA } from '../../utils/graphql'
import { useRecoilState, useRecoilValue } from 'recoil'
import { propertyDataState, selectedHomeState, sharedHomeState, userDataState } from '../../recoil/atoms'

export default function HomeActions() {
  const [propertyData, setPropertyData] = useRecoilState(propertyDataState)

  const selectedHome = useRecoilValue(selectedHomeState)
  const sharedHome = useRecoilValue(sharedHomeState)
  const userData = useRecoilValue(userDataState)

  const [insertSharedHomeData, ] = useMutation(INSERT_SHARED_HOME_DATA)

  const updateFavourite = () => {
    if (!propertyData.favourite.includes(selectedHome.id)) {
      setPropertyData({
        ...propertyData,
        viewed: propertyData.viewed.filter(homeId => homeId !== selectedHome.id),
        favourite: [...propertyData.favourite, selectedHome.id]
      })
      insertSharedHomeData({
        variables: {
          object: {
            property_id: selectedHome.id,
            data_type: 'favourite',
            shared_home_id: sharedHome.shared_home_id,
            user_id: userData.user_id
          }
        }
      })
    } else {
      setPropertyData({
        ...propertyData,
        viewed: [...propertyData.viewed, selectedHome.id],
        favourite: propertyData.favourite.filter(homeId => homeId !== selectedHome.id)
      })
      insertSharedHomeData({
        variables: {
          object: {
            property_id: selectedHome.id,
            data_type: 'viewed',
            shared_home_id: sharedHome.shared_home_id,
            user_id: userData.user_id
          }
        }
      })
    }
  }

  return (
    <Grid container alignItems={'center'} justify={'center'} style={{marginBottom: 10}}>
      <IconButton onClick={updateFavourite}>
        {propertyData.favourite.includes(selectedHome.id) ? <FavoriteBorderIcon /> : <FavoriteIcon />}
      </IconButton>
    </Grid>
  )
}
