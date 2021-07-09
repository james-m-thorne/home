import React from 'react'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import CommentIcon from '@material-ui/icons/Comment'
import LabelIcon from '@material-ui/icons/Label'
import { useMutation } from '@apollo/client'
import { MUTATE_SHARED_HOME_DATA } from '../../utils/graphql'
import { useRecoilValue } from 'recoil'
import { selectedHomeState, sharedHomeState, userDataState } from '../../recoil/atoms'

export default function HomeActions() {
  const selectedHome = useRecoilValue(selectedHomeState)
  const sharedHome = useRecoilValue(sharedHomeState)
  const userData = useRecoilValue(userDataState)

  const [mutateSharedHomeData, ] = useMutation(MUTATE_SHARED_HOME_DATA)

  const updateFavourite = () => {
    mutateSharedHomeData({
      variables: {
        object: {
          property_id: selectedHome.id,
          data_type: 'favourite',
          shared_home_id: sharedHome.shared_home_id,
          user_id: userData.user_id
        }
      }
    })
  }

  return (
    <Grid container alignItems={'center'} justify={'center'} style={{marginBottom: 10}}>
      {/*<IconButton>*/}
      {/*  <CommentIcon />*/}
      {/*</IconButton>*/}
      <IconButton onClick={updateFavourite}>
        <FavoriteIcon />
      </IconButton>
      {/*<IconButton>*/}
      {/*  <VisibilityOffIcon />*/}
      {/*</IconButton>*/}
      {/*<IconButton>*/}
      {/*  <LabelIcon />*/}
      {/*</IconButton>*/}
    </Grid>
  )
}
