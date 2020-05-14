import React, { memo } from 'react'
import { List, Tooltip } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import { map } from 'lodash-es'

import { Dashboard, AccountTree, WarningOutlined, SettingsOutlined } from '@material-ui/icons'
import { ListItem, ListItemIcon, ListItemText } from './drawer-layout.styles'

const isActive = (pathname: string, to: string) => pathname === to

interface MenuItemsProps {
  isExpanded: boolean
}

export const topMenuItems = [
  { primary: 'Dashboard', to: '/', icon: <Dashboard /> },
  { primary: 'Traces', to: '/traces', icon: <AccountTree /> },
  { primary: 'Errors', to: '/errors', icon: <WarningOutlined /> },
]

export const TopMenuItems = memo((props: MenuItemsProps) => {
  const { pathname } = useLocation()
  const { isExpanded } = props

  return (
    <List>
      {map(topMenuItems, (item) => {
        if (item.to) {
          return (
            <Link key={item.primary} to={item.to}>
              <ListItem button active={isActive(pathname, item.to)}>
                <Tooltip title={item.primary} placement="right" disableHoverListener={isExpanded}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                </Tooltip>
                <ListItemText primary={item.primary} isExpanded={isExpanded} />
              </ListItem>
            </Link>
          )
        }
        return null
      })}
    </List>
  )
})

export const bottomMenuItems = [
  { primary: 'Settings', to: '/settings', icon: <SettingsOutlined /> },
]

export const BottomMenuItems = memo((props: MenuItemsProps) => {
  const { pathname } = useLocation()
  const { isExpanded } = props

  return (
    <List>
      {map(bottomMenuItems, (item) => {
        if (item.to) {
          return (
            <Link key={item.primary} to={item.to}>
              <ListItem button active={isActive(pathname, item.to)}>
                <Tooltip title={item.primary} placement="right" disableHoverListener={isExpanded}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                </Tooltip>
                <ListItemText primary={item.primary} isExpanded={isExpanded} />
              </ListItem>
            </Link>
          )
        }

        return null
      })}
    </List>
  )
})
