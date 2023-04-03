import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_FORM_CREATE_TASK, OPEN_FORM_EDIT_PROJECT } from "../types/drawerType"
import React from 'react'
import { SET_SUBMIT_CREATE_TASK, SET_SUBMIT_EDIT_PROJECT } from "../types/projectType"

const stateDefault = {
    open: false,
    title: '',
    ComponentContentDrawer: <p>default content</p>,
    callBackSubmit: (propsValue) => {alert('Click demo')},
}



export const drawerReducer = (state = stateDefault, {type, payload, projectID, title}) => {
    switch (type) {
        case OPEN_DRAWER: {
            return {...state, open: true}
        }
        case CLOSE_DRAWER: {
            return {...state, open: false}
        }
        
        case OPEN_FORM_EDIT_PROJECT: {
            return {...state, ComponentContentDrawer: payload, open: true, title: title }
        }

        case SET_SUBMIT_EDIT_PROJECT: {
            return {...state, callBackSubmit: payload}
        }

        case SET_SUBMIT_CREATE_TASK: {
            return {...state, callBackSubmit: payload}
        }

        case OPEN_FORM_CREATE_TASK: {
            return {...state, ComponentContentDrawer: payload, open: true, title: title}
        }

        default: {
            return {...state}
        }
    }
}