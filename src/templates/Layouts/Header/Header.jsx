import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../App";
import { ACCESS_TOKEN, USER_LOGIN } from "../../../util/settings/config";
import _ from "lodash";
import { Fragment } from "react";

const Header = () => {
  const { userLogin } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  console.log("userLogin: ", userLogin);

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <button
            className="px-8 py-3 font-semibold rounded bg-purple-600 text-gray-50 mr-5"
            onClick={() => {
              history.push("/login");
            }}
          >
            Sign in
          </button>
          <button
            className="px-8 py-3 font-semibold rounded bg-purple-600 text-gray-50"
            onClick={() => {
              history.push("/register");
            }}
          >
            Sign up
          </button>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div className="flex">
          <img
            src={userLogin.avatar}
            style={{ borderRadius: "50px" }}
            width={50}
            height={50}
            alt="avatar"
          />
          <button
            className="self-center px-8 py-3 rounded"
            onClick={() => {
              history.push("/profile");
            }}
          >
            Hello! <span className="text-orange-500">{userLogin.name}</span>
          </button>
        </div>
        <button
          className="text-green-500 mr-5"
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(ACCESS_TOKEN);
            history.push("/home");
            window.location.reload();
          }}
        >
          Đăng xuất
        </button>
      </Fragment>
    );
  };
  return (
    <div>
      <header className="p-4 bg-gray-100 text-gray-800">
        <div className="container flex justify-between h-16 mx-auto">
          <div className="flex">
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="Back to homepage"
              className="flex items-center p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 32 32"
                className="w-8 h-8"
              >
                <title>{"j"}</title>
                <path d="M23.039 3.993h-12.191c-0.442 0-0.8 0.358-0.8 0.8v0.929c0 0.442 0.358 0.8 0.8 0.8h10.463v12.863c0.005 0.092 0.007 0.201 0.007 0.309 0 1.66-0.625 3.174-1.653 4.32l0.005-0.006c-1.072 1.085-2.561 1.757-4.206 1.757-0.138 0-0.274-0.005-0.41-0.014l0.018 0.001c-0.117 0.008-0.254 0.013-0.392 0.013-1.646 0-3.135-0.672-4.207-1.757l-0.001-0.001c-1.023-1.139-1.649-2.653-1.649-4.313 0-0.109 0.003-0.217 0.008-0.325l-0.001 0.015v-2.655c-0-0.442-0.358-0.8-0.8-0.8h-0.928c-0.442 0-0.8 0.358-0.8 0.8v2.687c-0.003 0.091-0.005 0.197-0.005 0.304 0 2.327 0.885 4.447 2.337 6.042l-0.007-0.007c1.528 1.567 3.659 2.538 6.018 2.538 0.15 0 0.299-0.004 0.446-0.012l-0.021 0.001c0.127 0.007 0.275 0.011 0.424 0.011 2.358 0 4.489-0.972 6.015-2.536l0.002-0.002c1.446-1.588 2.331-3.708 2.331-6.036 0-0.106-0.002-0.212-0.006-0.318l0 0.015v-14.623c-0.001-0.442-0.359-0.8-0.801-0.8v0z" />
              </svg>
            </a>
            <ul className="items-stretch hidden space-x-3 lg:flex">
              <li className="flex">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-purple-600 border-purple-600"
                >
                  Home
                </a>
              </li>
              <li className="flex">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
                  onClick={() => {
                    if (typeof userLogin.id === "undefined") {
                      history.push("/login");
                    } else {
                      history.push("/Jura");
                    }
                  }}
                >
                  Jura
                </a>
              </li>
              <li className="flex">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
                  onClick={() => {
                    if (typeof userLogin.id === "undefined") {
                      history.push("/login");
                    } else {
                      history.push("/admin");
                    }
                  }}
                >
                  Admin
                </a>
              </li>
            </ul>
          </div>
          <div className="items-center flex-shrink-0 hidden lg:flex">
            {renderLogin()}
          </div>
          <button className="p-4 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
