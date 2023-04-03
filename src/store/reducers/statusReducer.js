import { SET_ALL_STATUS } from "../types/statusType"


const stateDefault = {
    arrStatus: []
}



export const statusReducer = (state = stateDefault, {type, payload}) => {
    switch (type) {
        case SET_ALL_STATUS: {
            return {...state, arrStatus: payload}
        }

        default: {
            return {...state}
        }
    }
}