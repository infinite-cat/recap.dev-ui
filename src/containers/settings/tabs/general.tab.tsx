import React from 'react'
import styled from 'styled-components/macro'
import { Button, TextField } from '@material-ui/core'

import { CardHeader } from '../../../components'
import { TabCard } from './tabs.styles'

const CleanUpRow = styled.div`
  display: flex;
  align-items: center;
`
const DaysInput = styled(TextField)`
  width: 60px;
  margin: 0 10px;
`

export const GeneralTab = () => {
  return (
    <TabCard>
      <CardHeader>Cleanup data</CardHeader>
      <CleanUpRow>
        Cleanup data older than
        <DaysInput value={30} name="days" variant="outlined" size="small" />
        days
      </CleanUpRow>
      <Button color="primary" variant="contained">
        Clean
      </Button>
    </TabCard>
  )
}
