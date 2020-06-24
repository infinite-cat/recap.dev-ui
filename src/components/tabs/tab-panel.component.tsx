import React, { memo } from 'react'
import styled from 'styled-components/macro'

import { mobileMediaQuery } from '../../utils'

const Wrapper = styled.div`
  margin: 0 20px;
  @media (${mobileMediaQuery}) {
    margin: 10px 0;
  }
`

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

export const TabPanel = memo((props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <Wrapper
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Wrapper>
  )
})
