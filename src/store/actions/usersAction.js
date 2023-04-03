import { result } from "lodash";
import { history } from "../../App";
import { UsersService } from "../../services/UsersService";
import { openNotificationWithIcon } from "../../util/Notifications/NotificationJura";
import { ACCESS_TOKEN, USER_LOGIN } from "../../util/settings/config";
import { DISPLAY_LOADING, HIDE_LOADING } from "../types/loadingType";
import { DISPLAY_MODAL, DISPLAY_MODAL1, DISPLAY_MODAL2, DISPLAY_MODAL3 } from "../types/modalType";
import { GET_USER_SEARCH, SET_USER_BY_PROJECTID, SIGN_IN_ACTION } from "../types/usersType";


export const usersAction = {
    signInAction: (thongTinDangNhap) => {
        return async (dispatch) => {
            await dispatch({
                type: DISPLAY_LOADING,
            })
            try {
                const result = await UsersService.signIn(thongTinDangNhap)
                if (result.data.statusCode === 200) {
                    dispatch({
                        type: SIGN_IN_ACTION,
                        thongTinDangNhap: result.data.content
                    })
                    await dispatch({
                        type: HIDE_LOADING,
                    })
                    dispatch({
                        type: DISPLAY_MODAL,
                    })
                    history.push('/Jura')
                }
            } catch (errors) {
                await dispatch({
                    type: HIDE_LOADING,
                })
                dispatch({
                    type: DISPLAY_MODAL1,
                })
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },
    signUpAction: (thongTinDangKy) => {
        return async (dispatch) => {
            await dispatch({
                type: DISPLAY_LOADING,
            })
            try {
                const result = await UsersService.signUp(thongTinDangKy)
                if (result.data.statusCode === 200) {
                    await dispatch({
                        type: HIDE_LOADING,
                    })
                    dispatch({
                        type: DISPLAY_MODAL2
                    })
                }
            } catch (errors) {
                await dispatch({
                    type: HIDE_LOADING,
                })
                dispatch({
                    type: DISPLAY_MODAL3
                })
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },
    getUserAction: (keyWord) => {
        return async (dispatch) => {
            try {
                const result = await UsersService.getUser(keyWord)
                if (result.data.statusCode === 200) {
                    dispatch({
                        type: GET_USER_SEARCH,
                        payload: result.data.content,
                    })
                }
            } catch (errors) {
                console.log("errors: ", errors.reponse?.data);

            }
        }
    },
    getUserByProjectIdAction: (projectId) => {
        return async (dispatch) => {
            try {
                const result = await UsersService.getUserByProjectId(projectId)
                if (result.data.statusCode === 200) {
                    dispatch({
                        type: SET_USER_BY_PROJECTID,
                        payload: result.data.content,
                    })
                }
            } catch (errors) {
                console.log("errors: ", errors);
                if(errors.response?.data.statusCode === 404) {
                    dispatch({
                        type: SET_USER_BY_PROJECTID,
                        payload: [],
                    })
                }
            }
        }
    },
    userEditAction:(Data)=>{
        return async (dispatch) => {
            try {
                const result = await UsersService.editUser(Data)
                if (result.data.statusCode === 200) {
                openNotificationWithIcon('success','editUser success!','')
                await  dispatch(usersAction.getUserAction(""));    
                }
            } catch (errors) {
                console.log("errors: ", errors);
                openNotificationWithIcon('error','editUser not success!','')
            }
        }
    },
    DeleteUserAction:(Id)=>{
        return async (dispatch) => {
            try {
                const result = await UsersService.DeleteUser(Id)
                if (result.data.statusCode === 200) {
                    openNotificationWithIcon('success','DeleteUser success!','')
                await  dispatch(usersAction.getUserAction(""));    
                }
            } catch (errors) {
                openNotificationWithIcon('error','Không thể xóa người dùng đã tạo project','')
                console.log("errors: ", errors);
            }
        }
    },
    AddUserAction:(thongTinDangKy)=>{
        return async (dispatch) => {
            try {
                const result = await UsersService.signUp(thongTinDangKy)
                if (result.data.statusCode === 200) {
                    openNotificationWithIcon('success','AddUser success!','')
                await  dispatch(usersAction.getUserAction(""));    
                }
            } catch (errors) {
                openNotificationWithIcon('error','AddUser not success!','')
                console.log("errors: ", errors);
            }
        }
    }
}