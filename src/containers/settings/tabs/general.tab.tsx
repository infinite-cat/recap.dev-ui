import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Box, Button, TextField } from '@material-ui/core'
import { isNumber } from 'lodash-es'

import { CardHeader } from '../../../components'
import { TabCard } from './tabs.styles'
import { getSettings_getSettings as getSettings } from '../../../graphql/queries/types/getSettings'
import { SettingsInput } from '../../../graphql/types/graphql-global-types'

const HostInput = styled(TextField)`
  width: 100%;
  max-width: 700px;
  margin: 0;
`

const CleanupDaysInput = styled(TextField)`
  width: 100%;
  max-width: 200px;
  margin: 0;
`

export interface GeneralTabProps {
  data: getSettings
  updateSettings: (settings: SettingsInput) => Promise<void>
}

export const GeneralTab = ({ data, updateSettings }: GeneralTabProps) => {
  const [host, setHost] = useState(data.host)
  const [cleanupAfterDays, setCleanupAfterDays] = useState(data.cleanupAfterDays)

  const saveHost = () => {
    updateSettings({
      ...data,
      host,
    })
  }

  const saveCleanup = () => {
    updateSettings({
      ...data,
      cleanupAfterDays,
    })
  }

  return (
    <>
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
        <Box mt={1}>
          <Button color="primary" variant="contained" onClick={saveHost}>
            Save
          </Button>
        </Box>
      </TabCard>
      <Box mt={2} />
      <TabCard>
        <CardHeader>Data Cleanup</CardHeader>
        <Box mb={1} mt={1}>
          Delete data older than a specified number of days. Leave empty to never delete data.
        </Box>
        <Box mb={1} mt={1}>
          <CleanupDaysInput
            value={cleanupAfterDays}
            onChange={(e) => {
              const num = Number(e.target.value)
              if (isNumber(num)) {
                setCleanupAfterDays(num)
              } else {
                setCleanupAfterDays(null)
              }
            }}
            name="cleanup"
            type="number"
            variant="outlined"
            size="small"
          />
        </Box>
        <Box mt={1}>
          <Button color="primary" variant="contained" onClick={saveCleanup}>
            Save
          </Button>
        </Box>
      </TabCard>
    </>
  )
}
