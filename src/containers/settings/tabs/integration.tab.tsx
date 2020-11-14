import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components/macro'
import { Box, Button, Link, TextField, Typography } from '@material-ui/core'
import { Link as LinkIcon } from 'react-feather'
import { useMutation } from '@apollo/client'
import { find, filter } from 'lodash-es'
import { useSnackbar } from 'notistack'

import { CardHeader, LoadingButton } from '../../../components'
import { TabCard } from './tabs.styles'
import { getSettings_getSettings as getSettings } from '../../../graphql/queries/types/getSettings'
import { JsonCard } from '../../../components/json/json-card.component'
import { TestAwsIntegration, TestSlackIntegration } from '../../../graphql/mutations'
import { SettingsInput } from '../../../graphql/types/graphql-global-types'
import { ReactComponent as SlackLogo } from '../../../svg/integrations/slack.svg'

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
  const [awsIntegrationError, setAwsIntegrationError] = useState('')
  const [setSlackIntegrationError, setSetSlackIntegrationError] = useState('')
  const { enqueueSnackbar } = useSnackbar()

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

  const notificationConfigurations = useMemo(
    () => (data?.notificationConfigurations && JSON.parse(data?.notificationConfigurations)) || [],
    [data],
  )

  const backendSlackConfiguration = find(notificationConfigurations, { type: 'slack' })
  const [slackConfiguration, setSlackConfiguration] = useState(backendSlackConfiguration)

  const testAwsIntegrationFn = useCallback(async () => {
    setAwsIntegrationError('')
    const response = await testAwsIntegration()
    const result = response?.data?.testAwsIntegration ?? {}
    const variant = result.success ? 'success' : 'error'
    const text = result.success ? 'AWS integration works fine' : 'Something went wrong'
    const autoHideDuration = result.success ? 3000 : null
    if (result.error) {
      setAwsIntegrationError(result.error)
    }
    enqueueSnackbar(text, { variant, autoHideDuration })
  }, [testAwsIntegration, setAwsIntegrationError, enqueueSnackbar])

  const testSlackIntegration = useCallback(async () => {
    setSetSlackIntegrationError('')
    const response = await testSlackIntegrationMutation({
      variables: {
        ...slackConfiguration,
      },
    })
    const result = response?.data?.testSlackIntegration ?? {}
    const variant = result.success ? 'success' : 'error'
    const text = result.success ? 'Slack integration works fine' : 'Something went wrong'
    const autoHideDuration = result.success ? 3000 : null
    if (result.error) {
      setSetSlackIntegrationError(result.error)
    }

    enqueueSnackbar(text, { variant, autoHideDuration })
  }, [
    slackConfiguration,
    testSlackIntegrationMutation,
    setSetSlackIntegrationError,
    enqueueSnackbar,
  ])

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
        <StyledLink href="https://recap.dev/docs/integrations/aws" target="_blank">
          Setup guide <LinkIcon size={14} />
        </StyledLink>
        <Box mt={2} />
        <LoadingButton
          variant="contained"
          onClick={testAwsIntegrationFn}
          loading={awsIntegrationTestLoading}
          disabled={awsIntegrationTestLoading}
        >
          Test
        </LoadingButton>
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
        {awsIntegrationError && (
          <Box mt={2}>
            <JsonCard elevation={2} title="Error" src={awsIntegrationError} variant="outlined" />
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
        <StyledLink href="https://recap.dev/docs/integrations/slack" target="_blank">
          Setup guide <LinkIcon size={14} />
        </StyledLink>
        <Box mb={1} mt={2}>
          <Box mb={3}>
            <SettingsInputField
              value={slackConfiguration?.token}
              onChange={onSlackTokenChange}
              name="Bot Token"
              label="Bot OAuth Token"
              variant="outlined"
              size="small"
            />
          </Box>
          <SettingsInputField
            value={slackConfiguration?.channelId}
            onChange={onSlackChannelChange}
            name="Channel Id"
            label="Channel Id"
            variant="outlined"
            size="small"
          />
        </Box>
        <Box mb={1} mt={2}>
          <LoadingButton
            variant="contained"
            onClick={testSlackIntegration}
            loading={slackIntegrationTestLoading}
            disabled={slackIntegrationTestLoading}
          >
            Test
          </LoadingButton>
          <ActiveButton variant="contained" color="primary" onClick={saveSlackIntegration}>
            Save
          </ActiveButton>
          {slackConfiguration && (
            <ActiveButton variant="contained" color="primary" onClick={removeSlackIntegration}>
              Remove
            </ActiveButton>
          )}
        </Box>
        {setSlackIntegrationError && (
          <Box mt={2}>
            <JsonCard
              elevation={2}
              title="Error"
              src={setSlackIntegrationError}
              variant="outlined"
            />
          </Box>
        )}
      </TabCard>
    </>
  )
}
