import React, { useState } from 'react'
import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  PieChartOutlined,
  PlusOutlined,
  SearchOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import './SidebarJura.css'
import { history } from '../../../App';
import { useDispatch } from 'react-redux';
import { OPEN_FORM_CREATE_TASK } from '../../../store/types/drawerType';
import FormCreateTask from '../../../components/Forms/FormCreateTask/FormCreateTask';

const { Sider } = Layout;

const SidebarJura = () => {

  const dispatch = useDispatch()

  const [collapsed, setCollapsed] = useState(true);
  function getItem(label, key, icon, children, onClick) {
    return {
      key,
      icon,
      children,
      label,
      onClick,

    };
  }
  const items = [
    getItem('Create Task', '1', <PlusOutlined/>,'', () => {
      dispatch({
        type: OPEN_FORM_CREATE_TASK,
        payload: <FormCreateTask />,
        title: 'CREATE TASK'
      })
    } ),
    getItem('Search', '2', <SearchOutlined />),
    getItem('Back to home', '3', <HomeOutlined/>,'', () => {
      history.push('/home')
    } )
  ];
  return (
    <div style={{minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
    </div>
  )
}

export default SidebarJura