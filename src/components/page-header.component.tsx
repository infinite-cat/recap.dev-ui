/* eslint-disable react/no-array-index-key */
import React, { memo, PropsWithChildren, ReactElement } from 'react'
import { Breadcrumbs, IconButton, Typography, Link as MaterialLink, Box } from '@material-ui/core'
import { ArrowLeft } from 'react-feather'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Helmet } from 'react-helmet'

type Route = {
  path?: string
  breadcrumbName: string
}

type Breadcrumb = {
  routes: Route[]
}

type PageHeaderProps = PropsWithChildren<{
  title?: string
  subTitle?: string
  breadcrumb?: Breadcrumb
  onBack?: () => void
  actions?: ReactElement
}>

const Title = styled(Typography)`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const HeaderText = styled.div``

const StyledBox = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`

export const PageHeader = memo(
  ({ title = '', subTitle = '', breadcrumb, onBack, children, actions }: PageHeaderProps) => (
    <>
      <Helmet>
        <title>recap.dev {title && `| ${title}`}</title>
      </Helmet>
      <StyledBox p={2}>
        <Header>
          <HeaderText>
            <Title variant="h6">
              {onBack && (
                <IconButton onClick={onBack} color="inherit">
                  <ArrowLeft />
                </IconButton>
              )}
              {title}
            </Title>

            <Typography color="textSecondary">{subTitle}</Typography>
          </HeaderText>
          <Actions>{actions}</Actions>
        </Header>

        {breadcrumb?.routes && (
          <Box mb={2} mt={1}>
            <Breadcrumbs aria-label="breadcrumb">
              {breadcrumb.routes.map((route, index, arr) => {
                if (route.path) {
                  return (
                    <MaterialLink
                      key={index}
                      color={index === arr.length - 1 ? 'textPrimary' : 'inherit'}
                      to={route.path}
                      component={Link}
                    >
                      {route.breadcrumbName}
                    </MaterialLink>
                  )
                }
                return (
                  <Typography key={index} color="textPrimary">
                    {route.breadcrumbName}
                  </Typography>
                )
              })}
            </Breadcrumbs>
          </Box>
        )}
        {children}
      </StyledBox>
    </>
  ),
)
