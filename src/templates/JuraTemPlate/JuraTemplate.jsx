import React, { Fragment } from 'react'
import { Route } from 'react-router'
import '../../index.css'
import SidebarJura from './JiraComponents/SidebarJura'
import MenuJura from './JiraComponents/MenuJura'
import HeaderJura from '../../components/Jura/MainJura/HeaderJura'
import InfoJura from '../../components/Jura/MainJura/InfoJura'
import ContentJura from '../../components/Jura/MainJura/ContentJura'
import ModalJura from '../../components/ModalJura/ModalJura'

const JuraTemplate = (props) => {
  const { Component, ...restProps } = props

  return <Route {...restProps} render={(propsRoute) => {
    return <Fragment>
      <div className="jira flex">
        <SidebarJura />
        <MenuJura />
        <Component {...propsRoute} />
        <ModalJura />
      </div>

    </Fragment>
  }} />
}

export default JuraTemplate

