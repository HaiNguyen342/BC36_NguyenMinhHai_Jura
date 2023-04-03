import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  CLOSE_MODAL_EDIT,
  OPEN_MODAL_EDIT,
} from "../../../store/types/usersType";
const ModalAdmin = (props) => {
  const { open, title, ComponentEditDrawer } = useSelector(
    (state) => state.ModalEditReducer
  );
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        title={title}
        centered
        open={open}
        onOk={() => {
          dispatch({ type: CLOSE_MODAL_EDIT, open: false });
        }}
        onCancel={() => {
          dispatch({ type: CLOSE_MODAL_EDIT, open: false });
        }}
        width={1000}
      >
        {ComponentEditDrawer}
      </Modal>
    </>
  );
};
export default ModalAdmin;
