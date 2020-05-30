import React, { memo, useContext } from 'react'
import { List, Tooltip } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import { includes, map } from 'lodash-es'
import { Cpu, Moon, Sun } from 'react-feather'
import { Dashboard, AccountTree, WarningOutlined } from '@material-ui/icons'

import { ListItem, ListItemIcon, ListItemText } from './drawer-layout.styles'
import { ThemeContext } from '../../../contexts'

const isActive = (pathname: string, to: string) => {
  if (to === '/') {
    return to === pathname
  }
  return includes(pathname, to)
}

interface MenuItemsProps {
  isExpanded: boolean
}

export const topMenuItems = [
  { primary: 'Dashboard', to: '/', icon: <Dashboard /> },
  { primary: 'Units', to: '/units', icon: <Cpu /> },
  { primary: 'Errors', to: '/errors', icon: <WarningOutlined /> },
  { primary: 'Traces', to: '/traces', icon: <AccountTree /> },
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
  // { primary: 'Settings', to: '/settings', icon: <SettingsOutlined /> },
] as any[]

export const BottomMenuItems = memo((props: MenuItemsProps) => {
  const { pathname } = useLocation()
  const { toggleTheme, themeType } = useContext(ThemeContext)
  const { isExpanded } = props

  return (
    <List>
      <ListItem button onClick={toggleTheme}>
        <ListItemIcon>{themeType === 'dark' ? <Sun /> : <Moon />}</ListItemIcon>
        <ListItemText primary="Toggle Theme" isExpanded={isExpanded} />
      </ListItem>
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
