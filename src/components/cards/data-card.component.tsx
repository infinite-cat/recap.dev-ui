import React, { memo, PropsWithChildren } from 'react'
import styled from 'styled-components/macro'

import { Card } from './card.component'

type DataCardProps = PropsWithChildren<{
  type?: 'success' | 'ok' | 'error' | string
}>

const BaseCard = styled(Card)`
  color: ${(p) => p.theme.palette.common.white};
  padding: ${(p) => `${p.theme.spacing(1)}px ${p.theme.spacing(2)}px`};
  word-break: break-word;
`
const SuccessCard = styled(BaseCard)`
  background: ${(p) => p.theme.palette.success.main};
  box-shadow: none;
`
const ErrorCard = styled(BaseCard)`
  background: ${(p) => p.theme.palette.error.main};
  box-shadow: none;
`
const InfoCard = styled(BaseCard)`
  background: ${(p) => p.theme.palette.info.main};
  box-shadow: none;
`

export const DataCard = memo(({ type, children }: DataCardProps) => {
  if (type === 'success' || type === 'ok') {
    return <SuccessCard>{children}</SuccessCard>
  }

  if (type === 'error') {
    return <ErrorCard>{children}</ErrorCard>
  }

  return <InfoCard>{children}</InfoCard>
})
