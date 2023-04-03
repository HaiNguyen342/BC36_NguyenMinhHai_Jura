import { SET_ALL_PRIORITY } from "../types/priorityType"


const stateDefault = {
    arrAllPriority: []
}



export const priorityReducer = (state = stateDefault, {type, payload}) => {
    switch (type) {
        case SET_ALL_PRIORITY: {
            return {...state, arrAllPriority: payload}
        }

        default: {
            return {...state}
        }
    }
}