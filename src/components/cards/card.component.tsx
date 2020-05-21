import styled from 'styled-components/macro'
import { Card as MaterialCard } from '@material-ui/core'

export const Card = styled(MaterialCard)`
  box-shadow: ${(p) => (p.variant === 'outlined' ? '' : p.theme.custom.boxShadow)};
`
