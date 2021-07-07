import React, { useState, useEffect } from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Skeleton from '@material-ui/lab/Skeleton'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useStyles } from './HomeImages.styles'

function HomeImages({ images }) {
  const classes = useStyles()
  const imagesLength = images ? images.length : 0
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    setSelectedImageIndex(0)
  }, [images])

  const nextImage = () => {
    const nextIndex = selectedImageIndex + 1
    setSelectedImageIndex(nextIndex >= imagesLength ? 0 : nextIndex)
  }

  const previousImage = () => {
    const previousIndex = selectedImageIndex - 1
    setSelectedImageIndex(previousIndex <= 0 ? imagesLength - 1 : previousIndex)
  }

  if (!images) {
    return <Skeleton variant={'rect'} height={250} />
  }

  return (
    <div className={classes.imageGrid}>
      <div>
        <IconButton className={classes.imageButton} onClick={previousImage}>
          <ArrowBackIosIcon fontSize={'small'}/>
        </IconButton>
      </div>
      <CardMedia
        className={classes.image}
        component="img"
        src={images[selectedImageIndex]}
        title="home-cover-image"
      />
      <div className={classes.nextImageContainer}>
        <IconButton className={classes.imageButton} onClick={nextImage}>
          <ArrowForwardIosIcon fontSize={'small'}/>
        </IconButton>
      </div>
    </div>
  )
}

export default HomeImages
