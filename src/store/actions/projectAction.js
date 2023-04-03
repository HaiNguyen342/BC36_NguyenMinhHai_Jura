import { ProjectService } from "../../services/ProjectService";
import { DISPLAY_LOADING, HIDE_LOADING } from "../types/loadingType";
import { DISPLAY_MODAL4, DISPLAY_MODAL5 } from "../types/modalType";
import { CHANGE_TASK_MODAL, GET_ALL_PROJECT, PUT_PROJECT_DETAIL, SET_PROJECT_DETAIL, SET_TASK_DETAIL } from "../types/projectType";
import { history } from '../../App'
import { CLOSE_DRAWER } from "../types/drawerType";
import { openNotificationWithIcon } from "../../util/Notifications/NotificationJura";
import { usersAction } from "./usersAction";
import { CHANGE_ASSIGNEES } from "../types/TaskType";
import { REMOVE_USER_ASSIGNESS } from "../types/usersType";
import { useDispatch, useSelector } from "react-redux";


export const projectAction = {

    createProjecAuthorizetAction: (thongTinDuAn) => {
        return async (dispatch) => {
            await dispatch({
                type: DISPLAY_LOADING
            })
            try {
                const result = await ProjectService.createProjectAuthorize(thongTinDuAn)
                if (result.data.statusCode === 200) {
                    await dispatch({
                        type: HIDE_LOADING,
                    })
                    await dispatch({
                        type: DISPLAY_MODAL4
                    })
                    history.push('/projectmanagement')
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
                await dispatch({
                    type: HIDE_LOADING
                })
                dispatch({
                    type: DISPLAY_MODAL5
                })
            }
        }
    },

    getAllProjectAction: (keyWord) => {
        return async (dispatch) => {
            try {
                const result = await ProjectService.getAllProject(keyWord)
                if (result.data.statusCode === 200) {
                    dispatch({
                        type: GET_ALL_PROJECT,
                        payload: result.data.content
                    })
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },
    getProjectDetailAction: (id) => {
        return async (dispatch) => {
            try {
                const result = await ProjectService.getProjectDetail(id)
                if (result.data.statusCode === 200) {
                    dispatch({
                        type: SET_PROJECT_DETAIL,
                        payload: result.data.content
                    })
                    dispatch({
                        type: PUT_PROJECT_DETAIL,
                        payload: result.data.content
                    })
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },
    updateProjectAction: (project, projectId) => {
        return async (dispatch) => {
            await dispatch({
                type: DISPLAY_LOADING,
            })
            try {
                const result = await ProjectService.updateProject(project, projectId)
                if (result.data.statusCode === 200) {
                    await dispatch(projectAction.getAllProjectAction(''))
                    await dispatch({
                        type: CLOSE_DRAWER
                    })
                    await dispatch({ type: HIDE_LOADING })
                    openNotificationWithIcon('success', `Cập nhật dự án ${projectId} thành công`)

                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
                await dispatch({ type: HIDE_LOADING })
                openNotificationWithIcon('error', `Cập nhật dự án ${projectId} thất bại`)
            }
        }
    },
    deleteProjectAction: (projectId) => {
        return async (dispatch) => {
            await dispatch({
                type: DISPLAY_LOADING,
            })
            try {
                const result = await ProjectService.deleteProject(projectId)
                if (result.data.statusCode === 200) {
                    await dispatch(projectAction.getAllProjectAction(''))
                    await dispatch({ type: HIDE_LOADING })
                    openNotificationWithIcon('success', `Xóa dự án ${projectId} thành công!`)
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
                await dispatch({ type: HIDE_LOADING })
                openNotificationWithIcon('error', 'Xóa dự án ${projectId} thất bại!')
            }
        }
    },
    assignUserProjectAction: (editValue) => {
        return async (dispatch) => {
            try {
                const result = await ProjectService.assignUserProject(editValue)
                if (result.data.statusCode === 200) {
                    await dispatch(projectAction.getAllProjectAction(''))
                    openNotificationWithIcon('success', `Thêm user có id ${editValue.userId} thành công!`)
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
                openNotificationWithIcon('error', 'Không thể thêm user này!')
            }
        }
    },
    removeUserFromProjectAction: (editValue) => {
        return async (dispatch) => {
            try {
                const result = await ProjectService.removeUserFromProject(editValue)
                if (result.data.statusCode === 200) {
                    await dispatch(projectAction.getAllProjectAction(''))
                    openNotificationWithIcon('success', `Xóa user có id ${editValue.userId} thành công!`)
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
                openNotificationWithIcon('error', 'Không thể xóa user này!')
            }
        }
    },
    createTaskAction: (taskObject) => {
        return async (dispatch) => {
            await dispatch({
                type: DISPLAY_LOADING
            })
            try {
                const result = await ProjectService.createTask(taskObject)
                if (result.data.statusCode === 200) {
                    console.log('result', result.data.content)
                    await dispatch({
                        type: HIDE_LOADING
                    })
                    await dispatch({
                        type: CLOSE_DRAWER
                    })
                    await dispatch(projectAction.getProjectDetailAction(taskObject.projectId))

                    openNotificationWithIcon('success', `Thêm task thành công!`)
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
                await dispatch({
                    type: HIDE_LOADING
                })
                openNotificationWithIcon('error', `Thêm task thất bại!`)
            }
        }
    },
    getTaskDetailAction: (taskId) => {
        return async (dispatch) => {
            try {
                const result = await ProjectService.getTaskDetail(taskId)
                if (result.data.statusCode === 200) {
                    console.log('result', result.data.content)
                    dispatch({
                        type: SET_TASK_DETAIL,
                        payload: result.data.content,
                    })
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },
    updateStatusAction: (taskStatusUpdate) => {
        return async (dispatch) => {
            try {
                const result = await ProjectService.updateStatus(taskStatusUpdate)
                if (result.data.statusCode === 200) {
                    await dispatch(projectAction.getProjectDetailAction(taskStatusUpdate.projectId))
                    await dispatch(projectAction.getTaskDetailAction(taskStatusUpdate.taskId))
                    openNotificationWithIcon('success', `Cập nhật task ${taskStatusUpdate.taskId} thành công!`)
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },

    updatePriorityAction: (taskPriorityUpdate) => {
        return async (dispatch) => {
            try {
                const result = await ProjectService.updatePriority(taskPriorityUpdate)
                if (result.data.statusCode === 200) {
                    await dispatch(projectAction.getProjectDetailAction(taskPriorityUpdate.projectId))
                    await dispatch(projectAction.getTaskDetailAction(taskPriorityUpdate.taskId))
                    openNotificationWithIcon('success', `Cập nhật task thành công!`)
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },

    updateDesciptionAction: (taskDesciptionUpdate) => {
        return async (dispatch) => {
            try {
                const result = await ProjectService.updateDescription(taskDesciptionUpdate)
                if (result.data.statusCode === 200) {
                    await dispatch(projectAction.getProjectDetailAction(taskDesciptionUpdate.projectId))
                    await dispatch(projectAction.getTaskDetailAction(taskDesciptionUpdate.taskId))
                    openNotificationWithIcon('success', `Cập nhật task thành công!`)
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },

    updateTimeTrackingAction: (taskTimeTrackingUpdate) => {
        return async (dispatch) => {
            try {
                const result = await ProjectService.updateTimeTracking(taskTimeTrackingUpdate)
                if (result.data.statusCode === 200) {
                    await dispatch(projectAction.getProjectDetailAction(taskTimeTrackingUpdate.projectId))
                    await dispatch(projectAction.getTaskDetailAction(taskTimeTrackingUpdate.taskId))
                    openNotificationWithIcon('success', `Cập nhật task thành công!`)
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },
    updateEstimateAction: (taskEstimateUpdate) => {
        return async (dispatch) => {
            try {
                const result = await ProjectService.updateEstimate(taskEstimateUpdate)
                if (result.data.statusCode === 200) {
                    await dispatch(projectAction.getProjectDetailAction(taskEstimateUpdate.projectId))
                    await dispatch(projectAction.getTaskDetailAction(taskEstimateUpdate.taskId))
                    openNotificationWithIcon('success', `Cập nhật task thành công!`)
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },

    updateTaskAction: (taskUpdateApi) => {
        return async (dispatch) => {
            try {
                const result = await ProjectService.updateTask(taskUpdateApi)
                if (result.data.statusCode === 200) {
                    await dispatch(projectAction.getProjectDetailAction(taskUpdateApi.projectId))
                    await dispatch(projectAction.getTaskDetailAction(taskUpdateApi.taskId))
                    openNotificationWithIcon('success', `Cập nhật task thành công!`)
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
            }
        }
    }
}