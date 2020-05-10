import React, { useCallback, useContext, useEffect, useState, memo } from 'react'
import { Toolbar, IconButton, useMediaQuery } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { User } from 'react-feather'
import { useLocation } from 'react-use'

import ElevationScroll from '../elevation-scroll.component'
import ThemeSwitcher from '../../theme-switcher.component'
import { AppBarContext } from '../../../contexts'
import { TopMenuItems, BottomMenuItems } from './drawer-layout.utils'
import { mobileMediaQuery } from '../../../utils'
import {
  Wrapper,
  Drawer,
  AppBar,
  ArrowIcon,
  ArrowWrapper,
  Content,
  Flex,
  FullLogo,
  Hr,
  RightAppBar,
  RightAppBarItem,
  Logo,
} from './drawer-layout.styles'

interface DrawerLayoutProps {
  children: React.ReactElement
}

export const DrawerLayout = memo(({ children }: DrawerLayoutProps) => {
  const { pathname } = useLocation()
  const { isExpanded, setExpanded } = useContext(AppBarContext)
  const [isOpen, setOpen] = useState(false)
  const isMobile = useMediaQuery(`(${mobileMediaQuery})`)

  const toggleExpand = useCallback(() => setExpanded(!isExpanded), [isExpanded, setExpanded])
  const openSidebar = useCallback(() => setOpen(true), [setOpen])
  const closeSidebar = useCallback(() => setOpen(false), [setOpen])

  useEffect(closeSidebar, [pathname])

  return (
    <Wrapper>
      <ElevationScroll threshold={1}>
        <AppBar position="fixed" open={isExpanded}>
          <Toolbar>
            {isMobile && (
              <IconButton onClick={openSidebar}>
                <Logo />
              </IconButton>
            )}
            <Flex />
            <RightAppBar>
              <RightAppBarItem> <ThemeSwitcher /></RightAppBarItem>
              <RightAppBarItem> <User /></RightAppBarItem>
            </RightAppBar>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={!isMobile || isOpen}
        expanded={isExpanded}
        onClose={closeSidebar}
      >
        <Link to="/"><FullLogo expanded={isExpanded} /></Link>
        <Hr expanded={isExpanded} />
        <TopMenuItems isExpanded={isExpanded} />
        <Flex />
        <BottomMenuItems isExpanded={isExpanded} />
        {!isMobile && (
          <ArrowWrapper>
            <IconButton onClick={toggleExpand}>
              <ArrowIcon expanded={isExpanded} />
            </IconButton>
          </ArrowWrapper>
        )}
      </Drawer>
      <Content expanded={isExpanded}>
        <div>
          <Toolbar />
          {children}
        </div>
      </Content>
    </Wrapper>
  )
})
