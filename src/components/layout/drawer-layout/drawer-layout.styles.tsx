import React from 'react'
import styled from 'styled-components/macro'
import MaterialAppBar from '@material-ui/core/AppBar'
import MaterialDrawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import MaterialListItem from '@material-ui/core/ListItem/ListItem'
import MaterialListItemText, { ListItemTextProps } from '@material-ui/core/ListItemText'
import MaterialListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon'
import { ChevronLeft } from 'react-feather'
import { transparentize } from 'polished'

import { ReactComponent as SvgFullLogo } from '../../../svg/full-logo.svg'
import { getTransition, mobileMediaQuery } from '../../../utils'

const width = 240
const smallWidth = 60

export const Wrapper = styled.div`
  display: flex;
`
export const AppBar = styled(MaterialAppBar)<{ open: boolean }>`
  width: ${(p) => (p.open ? `calc(100% - ${width}px)` : `calc(100% - ${smallWidth}px)`)};
  margin-left: ${(p) => (p.open ? `${width}px` : `${smallWidth}px`)};
  transition: ${(p) => getTransition(p.theme, ['width', 'margin'])};
  background: ${(p) => p.theme.palette.background.paper};
  @media (${mobileMediaQuery}) {
    width: 100%;
    margin-left: 0;
  }
`
export const Drawer = styled(({ expanded, ...props }) => <MaterialDrawer {...props} />)<{
  expanded: boolean
}>`
  .MuiPaper-root {
    width: ${(p) => (p.expanded ? `${width}px` : `${smallWidth}px`)};
    background: ${(p) => p.theme.palette.background.paper};
    box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15);
    overflow-x: hidden;
    flex-shrink: 0;
    white-space: nowrap;
    transition: ${(p) => getTransition(p.theme, ['width'])};
    border: none;
    .MuiSvgIcon-root,
    .MuiTypography-root {
    }
    .MuiButtonBase-root {
      &:hover {
        background-color: ${(p) => transparentize(0.95, p.theme.palette.primary.main)};
      }
    }
    @media (${mobileMediaQuery}) {
      width: ${width}px;
    }
  }
`
export const FullLogo = styled(({ expanded, ...props }) => <SvgFullLogo {...props} />)<{
  expanded: boolean
}>`
  position: relative;
  left: ${(p) => (p.expanded ? '0' : '-30px')};
  width: ${width}px;
  height: 50px;
  padding: 0 40px;
  margin: 20px 0 0 0;
  cursor: pointer;
  transition: ${(p) => getTransition(p.theme, ['left'])};
  @media (${mobileMediaQuery}) {
    left: 0;
  }
  .logo-text {
    color: ${(p) => p.theme.palette.text.primary};
    opacity: ${(p) => (p.expanded ? 1 : 0)};
    transition: ${(p) => getTransition(p.theme, ['opacity'])};
    @media (${mobileMediaQuery}) {
      opacity: 1;
    }
  }
`
export const Hr = styled.div<{ expanded: boolean }>`
  position: relative;
  left: ${(p) => (p.expanded ? '0' : '-30px')};
  width: ${(p) => (p.expanded ? 'calc(100% - 80px)' : 'calc(100% - 20px)')};
  height: 2px;
  margin: 0 40px 20px 40px;
  background: ${(p) => p.theme.palette.text.primary};
  transition: ${(p) => getTransition(p.theme, ['width', 'left'])};
  @media (${mobileMediaQuery}) {
    left: 0;
    width: calc(100% - 80px);
  }
`
export const Flex = styled.div`
  flex: 1;
`
export const ArrowWrapper = styled(Toolbar)`
  display: flex;
  justify-content: flex-end;
  padding: 0 6px;
  svg {
    color: ${(p) => p.theme.palette.text.primary};
  }
`
export const ArrowIcon = styled(({ expanded, ...props }) => <ChevronLeft {...props} />)<{
  expanded: boolean
}>`
  transform: rotate(${(p) => (p.expanded ? 0 : '540deg')});
  transition: ${(p) => getTransition(p.theme, ['all'])} !important;
  color: ${(p) => p.theme.palette.common.white};
`
export const Content = styled.main<{ expanded: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(p) => (p.expanded ? `calc(100% - ${width}px)` : `calc(100% - ${smallWidth}px)`)};
  min-height: 100vh;
  margin-left: ${(p) => (p.expanded ? `${width}px` : `${smallWidth}px`)};
  transition: ${(p) => getTransition(p.theme, ['width', 'margin'])};
  @media (${mobileMediaQuery}) {
    width: 100%;
    margin-left: 0;
  }
`
export const ListItem = styled(({ active, ...props }) => <MaterialListItem {...props} />)<{
  active?: boolean
}>`
  min-height: 55px;
  background: ${(p) => (p.active ? transparentize(0.9, p.theme.palette.primary.main) : '')};
  border-left: ${(p) =>
    p.active ? `4px solid ${p.theme.palette.primary.main}` : '4px solid transparent'};
  color: ${(p) => (p.active ? p.theme.palette.primary.main : '')};
`

interface StyledListItemTextProps extends ListItemTextProps {
  isExpanded: boolean
}

export const ListItemText = styled(({ isExpanded, ...props }) => (
  <MaterialListItemText {...props} />
))<StyledListItemTextProps>`
  opacity: ${(p) => (p.isExpanded ? 1 : 0)};
  transition: ${(p) => getTransition(p.theme, ['opacity'])};
  .MuiListItemText-primary {
    font-weight: 500;
  }
  @media (${mobileMediaQuery}) {
    opacity: 1;
  }
`
export const ListItemIcon = styled(MaterialListItemIcon)`
  color: inherit;
`
