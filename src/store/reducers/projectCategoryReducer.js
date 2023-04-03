import { SET_PROJECT_CATEGORY } from "../types/projectCategoryType"

const stateDefault = {
    arrProjectCategory: []
}

export const projectCategoryReducer = (state = stateDefault, {type, payload}) => {
    switch (type) {
        case SET_PROJECT_CATEGORY: {
            return {...state, arrProjectCategory: payload}
        }

        default: return { ...state }
    }
}