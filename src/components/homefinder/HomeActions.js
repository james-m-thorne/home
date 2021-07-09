import React from 'react'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import CommentIcon from '@material-ui/icons/Comment'
import LabelIcon from '@material-ui/icons/Label'

export default function HomeActions() {

  return (
    <Grid container alignItems={'center'} justify={'center'} style={{marginBottom: 10}}>
      <IconButton>
        <CommentIcon />
      </IconButton>
      <IconButton>
        <FavoriteIcon />
      </IconButton>
      <IconButton>
        <VisibilityOffIcon />
      </IconButton>
      <IconButton>
        <LabelIcon />
      </IconButton>
    </Grid>
  )
}
