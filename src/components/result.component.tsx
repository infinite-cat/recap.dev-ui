import React, { memo, ReactNode } from 'react'
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

type PredefinedResultProps = {
  className?: string
  text?: string
}

type ResultProps = {
  icon?: ReactNode
  className?: string
  text?: string
}

export const Result = memo(({ className, text, icon }: ResultProps) => (
  <Wrapper className={className}>
    {icon}
    <Text>{text}</Text>
  </Wrapper>
))

export const Empty = memo(({ className, text = 'No data to display' }: PredefinedResultProps) => (
  <Result
    icon={<NoData />}
    text={text}
    className={className}
  />
))

export const Success = memo(({ className, text = 'All good, system is stable' }: PredefinedResultProps) => (
  <Result
    icon={<SuccessIcon />}
    text={text}
    className={className}
  />
))
