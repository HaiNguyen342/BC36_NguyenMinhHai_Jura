import { GET_ALL_COMMENT } from "../types/TaskType"

const initialState = {
  comment:[]
}

export const CommentReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_COMMENT:
    return { ...state, comment:action.payload }

  default:
    return state
  }
}
