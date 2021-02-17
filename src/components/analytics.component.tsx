import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { BASE_URL } from '../constants'
import { deleteAllCookies, listenCookieChange } from '../utils'

export const Analytics = () => {
  const location = useLocation()

  useEffect(() => {
    const interval = listenCookieChange(deleteAllCookies)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    window?.gtag?.('event', 'page_view', {
      page_location: `https://recap.dev/${location.pathname}`,
      page_path: location.pathname,
      page_referrer: 'https://recap.dev/',
    })
  }, [location])

  return (
    <Helmet>
      <script src={`${BASE_URL}/analytics.js`} />
    </Helmet>
  )
}
