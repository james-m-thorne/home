import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import Button from '@material-ui/core/Button'
import Slider from '@material-ui/core/Slider'
import Popover from '@material-ui/core/Popover'
import { mobileViewState } from '../../recoil/atoms'
import { useStyles } from './FilterButton.styles'

export default function FilterButton({ icon, defaultValue, setFilter, min, max, step, suffix='' }) {  
  max = max + step

  const classes = useStyles()
  const mobileView = useRecoilValue(mobileViewState)
  const [anchorEl, setAnchorEl] = useState(null)
  const [value, setValue] = useState(defaultValue)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const calculateLabel = () => {
    const [selectedMin, selectedMax] = value
    let label
    if (selectedMax === max && selectedMin === min){
      label = 'Any'
    } else if (selectedMax === max && selectedMin > min) {
      label = `${selectedMin}${suffix}+`
    } else if (selectedMax < max && selectedMin === min) {
      label = `${selectedMax}${suffix}`
    } else {
      label = `${selectedMin}${suffix} - ${selectedMax}${suffix}`
    }
    return label
  }

  return (
    <>
      <Button 
        fullWidth
        variant={'contained'} 
        size={'small'}
        color={'secondary'}
        aria-label={'filter-button'}
        onClick={handleClick}
        classes={{label: classes.buttonLabel}}
        disableElevation={mobileView}
      >
        <div>
          {icon}
        </div>
        <div>
          {calculateLabel()}
        </div>
      </Button>
      <Popover
        id={'popover'}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{paper: classes.popover}}
      >
        <Slider
          orientation={'vertical'}
          getAriaValueText={value => value}
          aria-labelledby={'vertical-slider'}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          onChangeCommitted={(event, newValue) => setFilter(newValue)}
          marks={[{value: min, label: `${min}${suffix}`}, {value: max, label: `${max - step}${suffix}+`}]}
          valueLabelFormat={x => x === min || x === max ? '' : `${x}${suffix}`}
          valueLabelDisplay={'on'}
          classes={{valueLabel: classes.valueLabel, markLabel: classes.markLabel}}
        />
      </Popover>
    </>
  )
}