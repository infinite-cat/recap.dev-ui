// import original module declarations
import 'styled-components'
import { Theme } from './models'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
