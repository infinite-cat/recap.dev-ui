import React from 'react'
import styled from 'styled-components/macro'
import { Box, Button, Link } from '@material-ui/core'
import { Link as LinkIcon } from 'react-feather'

import { CardHeader } from '../../../components'
import { TabCard } from './tabs.styles'

const Title = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin: 14px 0 5px 0;
`
const StyledLink = styled(Link)`
  cursor: pointer;
`
const ActiveButton = styled(Button)`
  margin-left: 10px;
`

export const IntegrationTab = () => (
  <>
    <TabCard>
      <CardHeader>Enrichment</CardHeader>
      <Title>AWS</Title>
      <Box mb={1}>Enables gathering additional information from CloudWatch logs for AWS Lambda</Box>
      <StyledLink>
        Setup guide <LinkIcon size={14} />
      </StyledLink>
      <Box mt={2} />
      <Button variant="contained">Test</Button>
      <ActiveButton color="primary" variant="contained">
        Enable
      </ActiveButton>
    </TabCard>
    <Box mt={2} />
    <TabCard>
      <CardHeader>Notifications</CardHeader>
    </TabCard>
  </>
)
