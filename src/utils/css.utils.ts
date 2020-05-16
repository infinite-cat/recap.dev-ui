import { Theme } from '@material-ui/core'

export const getTransition = (theme: Theme, units: string[]) =>
  theme.transitions.create(units, {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  })

export const getFastTransition = (theme: Theme, units: string[]) =>
  theme.transitions.create(units, {
    duration: theme.transitions.duration.shortest,
  })

export const mobileMediaQuery = 'max-width: 800px'
