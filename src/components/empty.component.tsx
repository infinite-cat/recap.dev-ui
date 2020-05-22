import React, { memo } from 'react'
import styled from 'styled-components/macro'

import { ReactComponent as NoData } from '../svg/no-data.svg'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 300px;
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
