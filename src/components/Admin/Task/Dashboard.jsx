import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { usersAction } from "../../../store/actions/usersAction";
import React, { useRef, useState } from "react";
import {
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import {
  OPEN_MODAL_EDIT,
  OPEN_MODAL_EDIT_USER,
} from "../../../store/types/usersType";
import EditUser from "../User/EditUser";
import UserManager from "../User/UserManager";

const Dashboard = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersAction.getUserAction(""));
  }, []);
  const { userSearch } = useSelector((state) => state.usersReducer);
  const data = userSearch;

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
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
              height: 40,
              textAlign: "center",
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
              height: 40,
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
          color: filtered ? "#1890ff" : undefined,
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
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
      width: "10%",
      ...getColumnSearchProps("userId"),
      sorter: (item2, item1) => {
        return item2.userId - item1.userId;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ...getColumnSearchProps("phoneNumber"),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => {
        return (
          <Fragment key={index}>
            <button
              className="btn btn-success mr-2"
              onClick={() => {
                dispatch({
                  type: OPEN_MODAL_EDIT_USER,
                  title: "Add User",
                  ComponentEditDrawer: <UserManager />,
                  open: true,
                });
              }}
            >
              <UserAddOutlined style={{ height: "20px" }} />
            </button>
            <button
              className="btn btn-primary mr-2"
              onClick={() => {
                dispatch({
                  type: OPEN_MODAL_EDIT_USER,
                  title: "Edit User",
                  ComponentEditDrawer: <EditUser />,
                  open: true,
                  record,
                });
              }}
            >
              <FormOutlined style={{ height: "20px" }} />
            </button>
            <Popconfirm
              placement="topRight"
              title={"Are you sure to delete this project?"}
              onConfirm={() => {
                dispatch(usersAction.DeleteUserAction(record.userId));
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">
                <DeleteOutlined style={{ height: "20px" }} />
              </button>
            </Popconfirm>
          </Fragment>
        );
      },
    },
  ];
  return (
    <div>
      <h1 className="text-center mb-5">User Management</h1>
      <Table columns={columns} rowKey={"userId"} dataSource={data} />
    </div>
  );
};

export default Dashboard;
