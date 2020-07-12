import React, { useCallback, useState } from 'react'
import styled from 'styled-components/macro'
import { Box, Button, Link, TextField, Typography } from '@material-ui/core'
import { Link as LinkIcon } from 'react-feather'
import { useMutation } from '@apollo/react-hooks'
import { find, filter } from 'lodash-es'

import { CardHeader, FullWidthSpinner, StatusTag } from '../../../components'
import { TabCard } from './tabs.styles'
import { getSettings_getSettings as getSettings } from '../../../graphql/queries/types/getSettings'
import { testAwsIntegration_testAwsIntegration as testAwsIntegrationResponse } from '../../../graphql/mutations/types/testAwsIntegration'
import { JsonCard } from '../../../components/json/json-card.component'
import { TestAwsIntegration, TestSlackIntegration } from '../../../graphql/mutations'
import { SettingsInput } from '../../../graphql/types/graphql-global-types'
import { ReactComponent as SlackLogo } from '../../../svg/integrations/slack.svg'
import { testSlackIntegration_testSlackIntegration as testSlackIntegrationResponse } from '../../../graphql/mutations/types/testSlackIntegration'

const StyledLink = styled(Link)`
  cursor: pointer;
`
const ActiveButton = styled(Button)`
  margin-left: 10px;
`
const SettingsInputField = styled(TextField)`
  width: 100%;
  max-width: 700px;
  margin: 0;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
`
const IntegrationLogo = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`

export interface IntegrationTabProps {
  data: getSettings
  updateSettings: (settings: SettingsInput) => Promise<void>
}

export const IntegrationTab = ({ data, updateSettings }: IntegrationTabProps) => {
  const [awsIntegrationTestResult, setAwsIntegrationTestResult] = useState<
    testAwsIntegrationResponse | undefined
  >(undefined)
  const [slackIntegrationTestResult, setSlackIntegrationTestResult] = useState<
    testSlackIntegrationResponse | undefined
  >(undefined)

  const [testAwsIntegration, { loading: awsIntegrationTestLoading }] = useMutation(
    TestAwsIntegration,
  )
  const [testSlackIntegrationMutation, { loading: slackIntegrationTestLoading }] = useMutation(
    TestSlackIntegration,
  )

  const setAwsIntegrationSetting = useCallback(
    async (enabled: boolean) => {
      updateSettings({
        ...data,
        isAwsIntegrationEnabled: enabled,
      })
    },
    [data, updateSettings],
  )

  const notificationConfigurations =
    (data?.notificationConfigurations && JSON.parse(data?.notificationConfigurations)) || []
  const backendSlackConfiguration = find(notificationConfigurations, { type: 'slack' })
  const [slackConfiguration, setSlackConfiguration] = useState(backendSlackConfiguration)

  const testAwsIntegrationFn = useCallback(async () => {
    const response = await testAwsIntegration()
    setAwsIntegrationTestResult(response.data.testAwsIntegration)
  }, [testAwsIntegration])

  const testSlackIntegration = useCallback(async () => {
    const response = await testSlackIntegrationMutation({
      variables: {
        ...slackConfiguration,
      },
    })
    setSlackIntegrationTestResult(response.data.testSlackIntegration)
  }, [slackConfiguration, testSlackIntegrationMutation, setSlackIntegrationTestResult])

  const saveSlackIntegration = useCallback(async () => {
    const newSettings = { ...data }

    const newConfigurations = filter(
      notificationConfigurations,
      (configuration: any) => configuration.type !== 'slack',
    )

    if (slackConfiguration) {
      slackConfiguration.type = 'slack'
      newConfigurations.push(slackConfiguration)
    }

    newSettings.notificationConfigurations = JSON.stringify(newConfigurations)

    await updateSettings(newSettings)
  }, [slackConfiguration, data, notificationConfigurations, updateSettings])

  const removeSlackIntegration = async () => {
    await setSlackConfiguration(undefined)
    saveSlackIntegration()
  }

  const onSlackChannelChange = (e: any) =>
    setSlackConfiguration({ ...slackConfiguration, channelId: e.target.value })

  const onSlackTokenChange = (e: any) =>
    setSlackConfiguration({
      ...slackConfiguration,
      token: e.target.value,
    })

  return (
    <>
      <TabCard>
        <CardHeader>Enrichment</CardHeader>
        <Typography variant="h6">AWS</Typography>
        <Box mb={1}>
          Enables gathering additional information from CloudWatch logs for AWS Lambda
        </Box>
        <StyledLink>
          Setup guide <LinkIcon size={14} />
        </StyledLink>
        <Box mt={2} />
        <Button variant="contained" onClick={testAwsIntegrationFn}>
          Test
        </Button>
        {!data?.isAwsIntegrationEnabled && (
          <ActiveButton
            color="primary"
            variant="contained"
            onClick={() => setAwsIntegrationSetting(true)}
          >
            Enable
          </ActiveButton>
        )}
        {data?.isAwsIntegrationEnabled && (
          <ActiveButton
            color="primary"
            variant="contained"
            onClick={() => setAwsIntegrationSetting(false)}
          >
            Disable
          </ActiveButton>
        )}
        {awsIntegrationTestLoading && <FullWidthSpinner />}
        {awsIntegrationTestResult && !awsIntegrationTestLoading && (
          <Box mt={2}>
            Result: <StatusTag status={awsIntegrationTestResult.success ? 'OK' : 'ERROR'} />
            {awsIntegrationTestResult.error && (
              <JsonCard
                elevation={2}
                title="Error"
                src={awsIntegrationTestResult.error}
                variant="outlined"
              />
            )}
          </Box>
        )}
      </TabCard>
      <Box mt={2} />
      <TabCard>
        <CardHeader>Notifications</CardHeader>
        <Box mb={1} mt={1}>
          <Header>
            <IntegrationLogo>
              <SlackLogo />
            </IntegrationLogo>
            <Typography variant="h6">Slack</Typography>
          </Header>
        </Box>
        <Box mb={1}>Sends various notification messages to a specified Slack channel</Box>
        <StyledLink>
          Setup guide <LinkIcon size={14} />
        </StyledLink>
        <Box mb={1} mt={1}>
          <Box mb={1}>
            <SettingsInputField
              value={slackConfiguration?.token}
              onChange={onSlackTokenChange}
              name="Bot Token"
              label="Bot OAuth Token"
              size="small"
            />
          </Box>
          <SettingsInputField
            value={slackConfiguration?.channelId}
            onChange={onSlackChannelChange}
            name="Channel Id"
            label="Channel Id"
            size="small"
          />
        </Box>
        <Box mb={1} mt={1}>
          <Button variant="contained" onClick={testSlackIntegration}>
            Test
          </Button>
          <ActiveButton variant="contained" color="primary" onClick={saveSlackIntegration}>
            Save
          </ActiveButton>
          {slackConfiguration && (
            <ActiveButton variant="contained" color="primary" onClick={removeSlackIntegration}>
              Remove
            </ActiveButton>
          )}
        </Box>
        {slackIntegrationTestLoading && <FullWidthSpinner />}
        {slackIntegrationTestResult && !slackIntegrationTestLoading && (
          <Box mt={2}>
            Result: <StatusTag status={slackIntegrationTestResult.success ? 'OK' : 'ERROR'} />
            {slackIntegrationTestResult.error && (
              <JsonCard
                elevation={2}
                title="Error"
                src={slackIntegrationTestResult.error}
                variant="outlined"
              />
            )}
          </Box>
        )}
      </TabCard>
    </>
  )
}
