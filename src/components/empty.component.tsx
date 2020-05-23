import React, { memo } from 'react'
import styled, { keyframes } from 'styled-components/macro'

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
  height: 300px;
  animation: 300ms cubic-bezier(0, 0, 0.2, 1) ${appearAnimation};
`
const Text = styled.div`
  width: 97px;
  text-align: center;
`

type EmptyProps = {
  className?: string
  text?: string
}

export const Empty = memo(({ className, text = 'No data to display' }: EmptyProps) => (
  <Wrapper className={className}>
    <NoData />
    <Text>{text}</Text>
  </Wrapper>
))
