import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { Tab, Tabs, useMediaQuery } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'

import { TabPanel, PageHeader, LoadingPage } from '../../components'
import { GeneralTab, IntegrationTab } from './tabs'
import { mobileMediaQuery } from '../../utils'
import { getSettings } from '../../graphql/queries/types/getSettings'
import { GetSettings } from '../../graphql/queries/settings.query'

const StyledPageHeader = styled(PageHeader)`
  min-height: 100vh;
`
const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  padding-top: 20px;
  @media (${mobileMediaQuery}) {
    flex-direction: column;
  }
`
const StyledTabs = styled(Tabs)`
  background: ${(p) => p.theme.palette.background.paper};
  box-shadow: ${(p) => p.theme.custom.boxShadow};
  border-radius: 4px;
  margin-bottom: 10px;
  @media (${mobileMediaQuery}) {
    width: 100%;
  }
`
const TabPanels = styled.div`
  flex: 1;
  width: 100%;
`

const SettingsContainer = memo(() => {
  const [value, setValue] = React.useState(0)
  const isMobile = useMediaQuery(`(${mobileMediaQuery})`)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const { data, loading } = useQuery<getSettings>(GetSettings)

  return (
    <StyledPageHeader title="Settings">
      <Content>
        {loading && <LoadingPage />}
        {!loading && (
          <>
            <StyledTabs
              orientation={isMobile ? 'horizontal' : 'vertical'}
              variant="scrollable"
              indicatorColor="primary"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
            >
              <Tab label="General" />
              <Tab label="Integrations" />
            </StyledTabs>
            <TabPanels>
              <TabPanel value={value} index={0}>
                <GeneralTab />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <IntegrationTab data={data?.getSettings!} />
              </TabPanel>
            </TabPanels>
          </>
        )}
      </Content>
    </StyledPageHeader>
  )
})

export default SettingsContainer
