import React, { memo } from 'react'
import styled, { keyframes } from 'styled-components/macro'

import { ReactComponent as SuccessIcon } from '../svg/check-circle.svg'
import { ReactComponent as NoData } from '../svg/no-data.svg'

const appearAnimation = keyframes`
  from { 
    opacity: 0.65;
    transform: scale(0.85);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 300px;
  height: 100%;
  animation: 300ms cubic-bezier(0, 0, 0.2, 1) ${appearAnimation};
`
const Text = styled.div`
  margin-top: 15px;
  text-align: center;
`

type ResultProps = {
  type: 'empty' | 'success'
  className?: string
  text?: string
}

const typeIcons = {
  empty: <NoData />,
  success: <SuccessIcon />,
}

const defaultTexts = {
  empty: 'No Data',
  success: 'All good',
}

export const Result = memo(({ className, text, type }: ResultProps) => (
  <Wrapper className={className}>
    {typeIcons[type]}
    <Text>{text || defaultTexts[type]}</Text>
  </Wrapper>
))
