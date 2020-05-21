import React, { memo, useState } from 'react'
import styled from 'styled-components/macro'
import { DateTime } from 'luxon'
import { useQuery } from '@apollo/react-hooks'

import { PageHeader } from '../components'
import { getUnit } from '../graphql/queries/types/getUnit'
import { GetDashboardData } from '../graphql/queries/dashboard.query'

const Content = styled.div``

const DashboardContainer = memo(() => {
  const [since] = useState(
    DateTime.utc().minus({ hours: 23, days: 6 }).startOf('hour').toMillis().toString(),
  )

  const { data, loading } = useQuery<getUnit>(GetDashboardData, {
    variables: {
      since,
    },
  })

  console.log(loading, data)

  return (
    <PageHeader title="Dashboard" subTitle="Status of your system">
      <Content>Dashboard</Content>
    </PageHeader>
  )
})

export default DashboardContainer
