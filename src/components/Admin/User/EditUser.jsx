import React, { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "antd";
import { history } from "../../../App";
import { usersAction } from "../../../store/actions/usersAction";

const EditUser = (props) => {
  const dispatch = useDispatch();
  const { userEdit } = useSelector((state) => state.ModalEditReducer);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: String(userEdit.userId),
      passWord: "",
      email: userEdit.email,
      name: userEdit.name,
      phoneNumber: userEdit.phoneNumber,
    },
    onSubmit: (values) => {
      dispatch(usersAction.userEditAction(values));
    },
  });
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full px-5 md:px-10 h-screen"
      >
        <div className="mb-10">
          <h1 className="font-bold text-3xl text-gray-900">
            Chỉnh sửa người dùng
          </h1>
        </div>
        <div className="grid lg:grid-cols-2">
          <div className="flex -mx-3 mr-2">
            <div className="w-full px-3 mb-5">
              <label htmlFor="true" className="text-xs font-semibold px-1">
                ID
              </label>
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                </div>
                <input
                  type="text"
                  disabled
                  name="id"
                  onChange={formik.handleChange}
                  value={formik.values.id}
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="Nhập ID"
                />
              </div>
            </div>
          </div>
          <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
              <label htmlFor="true" className="text-xs font-semibold px-1">
                Email
              </label>
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                </div>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="nguyenvana@gmail.com"
                />
              </div>
            </div>
          </div>
          <div className="flex -mx-3 mr-2">
            <div className="w-full px-3 mb-5">
              <label htmlFor="true" className="text-xs font-semibold px-1">
                Password
              </label>
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                </div>
                <input
                  minLength={6}
                  type="password"
                  name="passWord"
                  onChange={formik.handleChange}
                  value={formik.values.passWord}
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="Nhập mật khẩu"
                />
              </div>
            </div>
          </div>
          <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
              <label htmlFor="true" className="text-xs font-semibold px-1">
                UserName
              </label>
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                </div>
                <input
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="nguyenvana@gmail.com"
                />
              </div>
            </div>
          </div>
          <div className="flex -mx-3 mr-2">
            <div className="w-full px-3 mb-12">
              <label htmlFor="true" className="text-xs font-semibold px-1">
                PhoneNumber
              </label>
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                </div>
                <input
                  type="tel"
                  minLength={9}
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="************"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row -mx-3">
          <div className="col-6 px-3 mb-5">
            <button
              className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold flex items-center justify-center"
              onClick={() => {
                history.push("/admin");
              }}
            >
              <ArrowLeftOutlined className="mr-2" />
              Trở lại
            </button>
          </div>
          <div className="col-6 px-3 mb-5">
            <button
              type="submit"
              className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
            >
              Lưu
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditUser;
