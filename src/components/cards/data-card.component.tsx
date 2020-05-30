import React, { memo, PropsWithChildren } from 'react'
import styled from 'styled-components/macro'

import { Card } from './card.component'

type DataCardProps = PropsWithChildren<{
  type?: 'success' | 'ok' | 'error' | string
}>

const BaseCard = styled(Card)`
  padding: ${(p) => `${p.theme.spacing(1)}px ${p.theme.spacing(2)}px`};
  word-break: break-word;
`
const SuccessCard = styled(BaseCard)`
  color: ${(p) => p.theme.palette.common.white};
  background: ${(p) => p.theme.custom.successGradient};
  box-shadow: none;
`
const ErrorCard = styled(BaseCard)`
  color: ${(p) => p.theme.palette.common.white};
  background: ${(p) => p.theme.custom.errorGradient};
  box-shadow: none;
`
const InfoCard = styled(BaseCard)`
  color: ${(p) => p.theme.palette.common.white};
  background: ${(p) => p.theme.custom.infoGradient};
  box-shadow: none;
`

export const DataCard = memo(({ type, children }: DataCardProps) => {
  if (type === 'success' || type === 'ok') {
    return <SuccessCard>{children}</SuccessCard>
  }

  if (type === 'error') {
    return <ErrorCard>{children}</ErrorCard>
  }

  if (type === 'info') {
    return <InfoCard>{children}</InfoCard>
  }

  return <BaseCard>{children}</BaseCard>
})
