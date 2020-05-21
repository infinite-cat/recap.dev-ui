import { Theme as MaterialTheme } from '@material-ui/core'

export type ThemeType = 'dark' | 'light'
export type Theme = MaterialTheme & {
  custom: {
    errorGradient: string
    successGradient: string
    infoGradient: string
    boxShadow: string
  }
}
