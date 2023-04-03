import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_DRAWER, OPEN_DRAWER } from '../../store/types/drawerType';
import { SET_SUBMIT_EDIT_PROJECT } from '../../store/types/projectType';


const DrawerJura = () => {
  const { open, ComponentContentDrawer, callBackSubmit, title } = useSelector(state => state.drawerReducer)
  const dispatch = useDispatch()

  const showDrawer = () => {
    dispatch({
      type: OPEN_DRAWER,
    })
  };
  const onClose = () => {
    dispatch({
      type: CLOSE_DRAWER
    })
  };
  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
          position: 'relative',
          zIndex: 10,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
      {ComponentContentDrawer}
      </Drawer>
    </>
  )
}

export default DrawerJura