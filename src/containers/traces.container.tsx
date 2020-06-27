import React from 'react'
import styled from 'styled-components/macro'

import { PageHeader } from '../components'
import { Traces } from '../components/traces/traces.component'

const Content = styled.div``

const TracesContainer = () => {
  return (
    <PageHeader title="Traces" subTitle="List of all your traces">
      <Content>
        <Traces />
      </Content>
    </PageHeader>
  )
}

export default TracesContainer
