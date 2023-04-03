import { DeleteOutlined, FormOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag, Popconfirm, Popover, Avatar, AutoComplete } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words'
import parse from "html-react-parser";
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectAction } from '../../../store/actions/projectAction';
import { OPEN_FORM_EDIT_PROJECT } from '../../../store/types/drawerType';
import FormEditProject from '../../../components/Forms/FormEditProject/FormEditProject';
import './ProjectManageme.css'
import { usersAction } from '../../../store/actions/usersAction';
import { NavLink } from 'react-router-dom';


const ProjectManagement = (props) => {
    const [value, setValue] = useState('')
    const { arrAllProject } = useSelector(state => state.projectReducer)
    const { userSearch } = useSelector(state => state.usersReducer)
    const searchRef = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(projectAction.getAllProjectAction(''))
    }, [])

    const data = arrAllProject
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            ...getColumnSearchProps('id'),
            sorter: (item2, item1) => {
                return item2.id - item1.id
            },
            // sortDirections: ['descend'],
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            // width: '20%',
            render: (text, record, index) => {
                return <NavLink to={`/projectdetail/${record.id}`}>
                    {text}
                </NavLink>
            },
            // ...getColumnSearchProps('projectName'),
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1;
            },

        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter: (item2, item1) => {
                let categoryName1 = item1.categoryName?.trim().toLowerCase();
                let categoryName2 = item2.categoryName?.trim().toLowerCase();
                if (categoryName2 < categoryName1) {
                    return -1;
                }
                return 1;
            },
            ...getColumnSearchProps('categoryName'),
        },
        {
            title: 'Creator',
            // dataIndex: 'creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color="red">{record.creator?.name}</Tag>
            },
            sorter: (item2, item1) => {
                let creator1 = item1.creator?.name.trim().toLowerCase();
                let creator2 = item2.creator?.name.trim().toLowerCase();
                if (creator2 < creator1) {
                    return -1;
                }
                return 1;
            },
            // ...getColumnSearchProps(`creator.name`),
        },
        {
            title: 'members',
            key: 'members',
            render: (text, record, index) => {
                return <div>
                    {record.members?.slice(0, 2).map((member, index) => {
                        return (
                            <Popover key={index} placement="top" title="members" content={() => {
                                return <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>avatar</th>
                                            <th>name</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {record.members?.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.userId}</td>
                                                <td><img src={item.avatar} width="30" height="30" style={{ borderRadius: '15px' }} /></td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <button onClick={() => {
                                                        dispatch(projectAction.removeUserFromProjectAction({
                                                            "projectId": record.id,
                                                            "userId": item.userId,
                                                        }))
                                                    }} className="btn btn-danger" style={{ borderRadius: '50%' }}>X</button>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            }}>
                                <Avatar key={index} src={member.avatar} />
                            </Popover>
                        )
                    })}

                    {record.members?.length > 2 ?
                        <Popover key={index} placement="top" title="members" content={() => {
                            return <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>avatar</th>
                                        <th>name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {record.members?.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item.userId}</td>
                                            <td><img src={item.avatar} width="30" height="30" style={{ borderRadius: '15px' }} /></td>
                                            <td>{item.name}</td>
                                            <td>
                                                <button onClick={() => {
                                                    dispatch(projectAction.removeUserFromProjectAction({
                                                        "projectId": record.id,
                                                        "userId": item.userId,
                                                    }))
                                                }} className="btn btn-danger" style={{ borderRadius: '50%' }}>X</button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        }} trigger='hover'>
                            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor:'default' }}>+{record.members?.length - 2}
                            </Avatar>
                        </Popover>
                        : ''}

                    <Popover placement="rightTop" title={"Add user"} content={() => {
                        return <AutoComplete
                            options={
                                userSearch?.map((user, index) => {
                                    return { label: user.name, value: user.userId.toString() }
                                })
                            }
                            onSearch={(value) => {
                                if(searchRef.current) {
                                    clearTimeout(searchRef.current);
                                }
                                searchRef.current = setTimeout(()=>{
                                    dispatch(usersAction.getUserAction(value))
    
                                },300)
                            }}
                            onSelect={(valueSelect, option) => {
                                // set giá trị hộp thoại = option.label
                                setValue(option.label)
                                // gọi api gửi về backend
                                dispatch(projectAction.assignUserProjectAction({
                                    "projectId": record.id,
                                    "userId": Number(valueSelect),
                                }))
                            }}
                            value={value}

                            onChange={(text) => {
                                setValue(text)
                            }}
                            style={{ width: '100%' }} />
                    }} trigger="click">
                        <Button style={{ borderRadius: '50%', width: '30px' }}>+</Button>
                    </Popover>
                </div>
            }

        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return <Fragment key={index}>
                    <button className='btn btn-primary mr-2' onClick={() => {
                        dispatch({
                            type: OPEN_FORM_EDIT_PROJECT,
                            payload: <FormEditProject />,
                            title: 'EDIT PROJECT',
                        })
                        dispatch(projectAction.getProjectDetailAction(record.id))
                    }}>
                        <FormOutlined style={{ height: '20px' }} />
                    </button>
                    <Popconfirm
                        placement="topRight"
                        title={'Are you sure to delete this project?'}
                        onConfirm={() => {
                            dispatch(projectAction.deleteProjectAction(record.id))
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className='btn btn-danger'>
                            <DeleteOutlined style={{ height: '20px' }} />
                        </button>
                    </Popconfirm>
                </Fragment>
            },
        },
    ];
    return <div className='container ml-2'>
        <h3 className='mt-5'>Project Management</h3>
        <Table columns={columns} rowKey={'id'} dataSource={data} />
    </div>
}

export default ProjectManagement