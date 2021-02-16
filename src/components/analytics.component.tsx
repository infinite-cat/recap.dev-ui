import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { BASE_URL } from '../constants'

export const Analytics = () => {
  const location = useLocation()

  useEffect(() => {
    window?.dataLayer?.push?.('event', 'page_view', {
      page_location: location.pathname,
    })
  }, [location])

  return (
    <Helmet>
      <script src={`${BASE_URL}/analytics.js`} />
    </Helmet>
  )
}
