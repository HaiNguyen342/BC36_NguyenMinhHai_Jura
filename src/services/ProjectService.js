
import { api } from "../constants/api"


export const ProjectService = {
    createProject: (thongTinDuAn) => {
        return api.post(`Project/createProject`, thongTinDuAn)
    },

    createProjectAuthorize: (thongTinDuAn) => {
        return api.post(`Project/createProjectAuthorize`, thongTinDuAn)
    },

    getAllProject: (keyWord) => {
        if (keyWord !== '') {
            return api.get(`Project/getAllProject?keyword=${keyWord}`)
        }
        return api.get(`Project/getAllProject`)
    },
    getProjectDetail: (id) => {
        return api.get(`Project/getProjectDetail?id=${id}`)
    },
    updateProject: (project, projectID) => {
        return api.put(`Project/updateProject?projectId=${projectID}`, project)
    },
    deleteProject: (projectId) => {
        return api.delete(`Project/deleteProject?projectId=${projectId}`)
    },
    assignUserProject: (editValue) => {
        return api.post(`Project/assignUserProject`, editValue)
    },
    removeUserFromProject: (editValue) => {
        return api.post(`Project/removeUserFromProject`, editValue)
    },
    createTask: (taskObject) => {
        return api.post(`Project/createTask`, taskObject)
    },
    getTaskDetail: (taskId) => {
        return api.get(`Project/getTaskDetail?taskId=${taskId}`)
    },
    updateStatus: (taskStatusUpdate) => {
        return api.put(`Project/updateStatus`, taskStatusUpdate)
    },
    updatePriority: (taskPriorityUpdate) => {
        return api.put(`Project/updatePriority`, taskPriorityUpdate)
    },
    updateDescription: (taskDesciptionUpdate) => {
        return api.put(`Project/updateDescription`, taskDesciptionUpdate )
    },
    updateTimeTracking: (taskTimeTrackingUpdate) => {
        return api.put(`Project/updateTimeTracking`, taskTimeTrackingUpdate)
    },
    updateEstimate: (taskEstimateUpdate) => {
        return api.put(`Project/updateEstimate`, taskEstimateUpdate)
    },
    updateTask: (taskUpdate) => {
        return api.post(`Project/updateTask`, taskUpdate)
    },
}
