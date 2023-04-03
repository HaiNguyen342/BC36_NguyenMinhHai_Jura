import { CLOSE_MODAL_EDIT, OPEN_MODAL_EDIT, OPEN_MODAL_EDIT_USER } from "../types/usersType"
import React from "react"
const initialState = {
    open: false,
    title:'',
    ComponentEditDrawer: <p>default content</p>,
    userEdit:{
      id: "string",
      passWord: "string",
      email: "string",
      name: "string",
      phoneNumber: "string",
    }
}

export const ModalEditReducer =(state = initialState, action) => {
  switch (action.type) {

  case OPEN_MODAL_EDIT:
    return { ...state, open:true}
  case CLOSE_MODAL_EDIT:
    return { ...state, open:false}
  case OPEN_MODAL_EDIT_USER:
    return { ...state, open:true, title:action.title,ComponentEditDrawer:action.ComponentEditDrawer,userEdit:action.record}
  default:
    return state
  }
}
