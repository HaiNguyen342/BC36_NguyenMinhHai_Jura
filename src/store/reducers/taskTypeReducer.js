import { SET_ALL_TASK_TYPE } from "../types/TaskType"


const stateDefault = {
    arrTaskType: []
}



export const taskTypeReducer = (state = stateDefault, {type, payload}) => {
    switch (type) {
        case SET_ALL_TASK_TYPE: {
            return {...state, arrTaskType: payload}
        }

        default: {
            return {...state}
        }
    }
}