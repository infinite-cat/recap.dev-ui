import React, { memo } from 'react'
import useScrollTrigger from '@material-ui/core/useScrollTrigger/useScrollTrigger'

interface Props {
  threshold?: number
  elevation?: number
  children: React.ReactElement
}

const defaultElevation = 4

// eslint-disable-next-line
const ElevationScroll = memo(({ threshold, children, elevation = defaultElevation }: Props) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold,
  })

  const triggerValue = trigger ? defaultElevation : 0
  const elevationValue = threshold ? triggerValue : elevation

  return React.cloneElement(children, { elevation: elevationValue })
})

export default ElevationScroll
