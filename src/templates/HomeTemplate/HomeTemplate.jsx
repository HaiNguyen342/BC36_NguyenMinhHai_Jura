import React, { Fragment, useEffect } from 'react'
import { Route } from 'react-router'
import Header from '../Layouts/Header/Header'

const HomeTemplate = (props) => {
  const { Component, ...restProps } = props

  return <Route {...restProps} render={(propsRoute) => {
    return <Fragment>
      <Header {...propsRoute} />
      <Component {...propsRoute} />
    </Fragment>
  }} />
}

export default HomeTemplate
