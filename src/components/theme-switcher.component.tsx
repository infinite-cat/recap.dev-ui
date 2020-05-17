import React, { useContext } from 'react'
import { IconButton } from '@material-ui/core'
import { Sun, Moon } from 'react-feather'

import { ThemeContext } from '../contexts'

type ThemeSwitcherProps = {
  className?: string
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { toggleTheme, themeType } = useContext(ThemeContext)

  return (
    <IconButton onClick={toggleTheme} className={className}>
      {themeType === 'dark' ? <Sun /> : <Moon />}
    </IconButton>
  )
}
