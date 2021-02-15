import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const Analytics = () => {
  const location = useLocation()

  useEffect(() => {
    window?.ga?.send(['pageview', location.pathname])
  }, [location])

  return <></>
}
