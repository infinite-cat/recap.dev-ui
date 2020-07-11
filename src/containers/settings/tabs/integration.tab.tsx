import React, { useCallback, useState } from 'react'
import styled from 'styled-components/macro'
import { Box, Button, Link } from '@material-ui/core'
import { Link as LinkIcon } from 'react-feather'
import { useMutation } from '@apollo/react-hooks'

import { CardHeader, FullWidthSpinner, StatusTag } from '../../../components'
import { TabCard } from './tabs.styles'
import { getSettings_getSettings as getSettings } from '../../../graphql/queries/types/getSettings'
import {
  setAwsIntegration as setAwsIntegrationMutation,
  testAwsIntegration as testAwsIntegrationMutation,
} from '../../../graphql/mutations'
import { testAwsIntegration_testAwsIntegration as testAwsIntegrationResponse } from '../../../graphql/mutations/types/testAwsIntegration'
import { JsonCard } from '../../../components/json/json-card.component'

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

export interface IntegrationTabProps {
  data: getSettings
}

export const IntegrationTab = ({ data }: IntegrationTabProps) => {
  const [awsIntegrationTestResult, setAwsIntegrationTestResult] = useState<
    testAwsIntegrationResponse | undefined
  >(undefined)
  const [setAwsIntegration] = useMutation(setAwsIntegrationMutation)
  const [testAwsIntegration, { loading: awsIntegrationTestLoading }] = useMutation(
    testAwsIntegrationMutation,
  )

  const setAwsIntegrationSetting = useCallback(
    async (enabled: boolean) => {
      await setAwsIntegration({
        variables: {
          enabled,
        },
        awaitRefetchQueries: true,
        refetchQueries: ['getSettings'],
      })
    },
    [setAwsIntegration],
  )

  const testAwsIntegrationFn = useCallback(async () => {
    const response = await testAwsIntegration()
    setAwsIntegrationTestResult(response.data.testAwsIntegration)
  }, [testAwsIntegration])

  return (
    <>
      <TabCard>
        <CardHeader>Enrichment</CardHeader>
        <Title>AWS</Title>
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
      </TabCard>
    </>
  )
}
