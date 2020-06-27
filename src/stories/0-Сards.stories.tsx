import React from 'react'
import { Box, Tooltip, Typography } from '@material-ui/core'

import { Card, DataCard, CardHeader } from '../components'

export default {
  title: 'Cards',
}

export const SimpleCard = () => (
  <Card>
    <Box p={2}>Simplest Card</Box>
  </Card>
)

export const DataCards = () => (
  <div>
    <DataCard>
      <CardHeader>Unit Name</CardHeader>
      <Tooltip title="dev-recap-func-test-unit" placement="top">
        <Typography noWrap>dev-recap-func-test-unit</Typography>
      </Tooltip>
    </DataCard>
    <Box mt={2} />
    <DataCard type="error">
      <CardHeader>Status</CardHeader>
      <div>Error</div>
    </DataCard>
    <Box mt={2} />
    <DataCard type="ok">
      <CardHeader>Status</CardHeader>
      <div>Ok</div>
    </DataCard>
  </div>
)
