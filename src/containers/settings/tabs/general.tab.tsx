import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Box, Button, TextField } from '@material-ui/core'

import { CardHeader } from '../../../components'
import { TabCard } from './tabs.styles'
import { getSettings_getSettings as getSettings } from '../../../graphql/queries/types/getSettings'
import { SettingsInput } from '../../../graphql/types/graphql-global-types'

const HostInput = styled(TextField)`
  width: 100%;
  max-width: 700px;
  margin: 0;
`

export interface GeneralTabProps {
  data: getSettings
  updateSettings: (settings: SettingsInput) => Promise<void>
}

export const GeneralTab = ({ data, updateSettings }: GeneralTabProps) => {
  const [host, setHost] = useState(data.host)

  const save = () => {
    updateSettings({
      ...data,
      host,
    })
  }

  return (
    <TabCard>
      <CardHeader>Host</CardHeader>
      <Box mb={1} mt={1}>
        Set up a custom host if you&apos;re using a domain name. This affects links in the
        notification channels, for example.
      </Box>
      <Box mb={1} mt={1}>
        <HostInput
          value={host}
          onChange={(e) => setHost(e.target.value)}
          name="host"
          variant="outlined"
          size="small"
        />
      </Box>
      <Box mb={1} mt={1}>
        <Button color="primary" variant="contained" onClick={save}>
          Save
        </Button>
      </Box>
    </TabCard>
  )
}
