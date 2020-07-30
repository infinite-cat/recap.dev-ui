import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useHistory, useLocation } from 'react-router-dom'
import { useDebounce } from 'react-use'

import { PageHeader } from '../components'
import { Traces } from '../components/traces/traces.component'

const Content = styled.div``

const TracesContainer = () => {
  const location = useLocation()
  const searchTerm = new URLSearchParams(location.search).get('query') ?? ''
  const history = useHistory()
  const [query, setQuery] = useState(searchTerm)

  useDebounce(
    () => {
      if (query !== searchTerm) {
        history.push(`/traces?query=${query}`)
      }
    },
    700,
    [query],
  )

  return (
    <PageHeader title="Traces" subTitle="List of all your traces">
      <Content>
        <Traces externalSearch={query} setExternalTerm={setQuery} />
      </Content>
    </PageHeader>
  )
}

export default TracesContainer
