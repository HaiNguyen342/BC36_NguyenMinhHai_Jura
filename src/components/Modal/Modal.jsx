import React, { Fragment } from 'react'
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_MODAL, HIDE_MODAL1, HIDE_MODAL2, HIDE_MODAL3, HIDE_MODAL4, HIDE_MODAL5 } from '../../store/types/modalType';

const Modal = () => {
  const {
     isModal,
     isModal1,
     isModal2,
     isModal3,
     isModal4,
     isModal5,
   } = useSelector(state => state.modalReducer)
  const dispatch = useDispatch()

  const showAlert = () => {
    Swal.fire({
      title: "Chúc mừng!!",
      text: "Đăng nhập thành công!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      return dispatch({
        type: HIDE_MODAL,
      })
    });
  }

  const showAlert1 = () => {
    Swal.fire({
      title: "Xin lỗi!!",
      text: "Đăng nhập thất bại!",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(function () {
      return dispatch({
        type: HIDE_MODAL1,
      })
    });
  }

  const showAlert2 = () => {
    Swal.fire({
      title: "Chúc mừng!!",
      text: "Đăng ký thành công!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      return dispatch({
        type: HIDE_MODAL2,
      })
    });
  }

  const showAlert3 = () => {
    Swal.fire({
      title: "Xin lỗi!!",
      text: "Đăng ký thất bại!",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(function () {
      return dispatch({
        type: HIDE_MODAL3,
      })
    });
  }

  const showAlert4 = () => {
    Swal.fire({
      title: "Chúc mừng!!",
      text: "Tạo dự án thành công!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      return dispatch({
        type: HIDE_MODAL4,
      })
    });
  }

  const showAlert5 = () => {
    Swal.fire({
      title: "Xin lỗi!!",
      text: "Tạo dự án thất bại!",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(function () {
      return dispatch({
        type: HIDE_MODAL5,
      })
    });
  }


  return (
    <Fragment>
      {isModal ? showAlert() : ''}
      {isModal1 ? showAlert1() : ''}
      {isModal2 ? showAlert2() : ''}
      {isModal3 ? showAlert3() : ''}
      {isModal4 ? showAlert4() : ''}
      {isModal5 ? showAlert5() : ''}
    </Fragment>
  )
}

export default Modal