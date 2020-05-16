import React, { memo } from 'react'
import styled from 'styled-components/macro'

import { PageHeader } from '../components'

const Content = styled.div``

const ErrorsContainer = memo(() => (
  <PageHeader title="Errors" subTitle="List of all your errors">
    <Content>Errors</Content>
  </PageHeader>
))

export default ErrorsContainer
