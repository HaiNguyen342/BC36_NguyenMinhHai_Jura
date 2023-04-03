import { TaskTypeService } from "../../services/TaskTypeService";
import { openNotificationWithIcon } from "../../util/Notifications/NotificationJura";
import { GET_ALL_COMMENT, SET_ALL_TASK_TYPE } from "../types/TaskType";


export const taskTypeAction = {

    getAllTaskTypeAction: () => {
        return async (dispatch) => {
            try {
                const result = await TaskTypeService.getAllTaskType()
                if (result.data.statusCode === 200) {
                    dispatch({
                        type: SET_ALL_TASK_TYPE,
                        payload: result.data.content
                    })
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },
    postCommentAction:(comment)=>{
        return async (dispatch) => {
            try {
                const result = await TaskTypeService.inSertComment(comment)
                if (result.data.statusCode === 200) {
                openNotificationWithIcon('success','inSertComment success!','')
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
                openNotificationWithIcon('error','inSertComment not success!','')
                
            }
        }
    },
    getAllCommentAction:(id)=>{
        return async (dispatch) => {
            try {
                const result = await TaskTypeService.getAllComment(id)
                if (result.data.statusCode === 200) {
                    openNotificationWithIcon('success','getAllComment success!','')
                    dispatch({
                        type: GET_ALL_COMMENT,
                        payload: result.data.content
                    })
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
                openNotificationWithIcon('error','getAllComment not success!','')
                
            }
        }
    },
    putUpdateCommentAction:(id,comment)=>{
        return async (dispatch) => {
            try {
                const result = await TaskTypeService.UpdateComment(id,comment)
                if (result.data.statusCode === 200) {
                    openNotificationWithIcon('success','UpdateComment success!','')
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
                openNotificationWithIcon('error','UpdateComment not success!','')
                
            }
        }
    },
    DeleteCommentAction:(id)=>{
        return async (dispatch) => {
            try {
                const result = await TaskTypeService.DeleteComment(id)
                if (result.data.statusCode === 200) {
                    openNotificationWithIcon('success','DeleteComment success!','')  
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
                openNotificationWithIcon('error','DeleteComment not success!','')
                
            }
        }
    }
    
}