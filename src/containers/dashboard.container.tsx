import React, { memo } from 'react'
import styled from 'styled-components/macro'

import { PageHeader } from '../components'

const Content = styled.div``

const DashboardContainer = memo(() => (
  <PageHeader title="Dashboard" subTitle="????">
    <Content>Dashboard</Content>
  </PageHeader>
))

export default DashboardContainer
