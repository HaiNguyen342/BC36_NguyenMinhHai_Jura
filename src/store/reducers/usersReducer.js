import { ACCESS_TOKEN, USER_LOGIN } from "../../util/settings/config"
import { GET_USER_SEARCH, SET_USER_BY_PROJECTID, SIGN_IN_ACTION } from "../types/usersType";

let user = {};
if(localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: user,
    userSearch: [],
    arrUserByProjectId: [],
}
export const usersReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SIGN_IN_ACTION : {
            const {thongTinDangNhap} = action;
           
            localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap));
            localStorage.setItem(ACCESS_TOKEN,thongTinDangNhap.accessToken);
            return {...state,userLogin:thongTinDangNhap}
        }
        case GET_USER_SEARCH: {
            
            return {...state, userSearch: action.payload}
        }

        case SET_USER_BY_PROJECTID: {
            return {...state, arrUserByProjectId: action.payload}
        }

        default: return { ...state }
    }
}