
import { api } from "../constants/api"


export const TaskTypeService = {
    getAllTaskType: () => {
        return api.get(`TaskType/getAll`)
    },
    inSertComment:(comment)=>{
        return api.post(`Comment/insertComment`,comment)
    },
    getAllComment:(id)=>{
        return api.get(`Comment/getAll?taskId=${id}`)
    },
    UpdateComment:(id,comment)=>{
        return api.put(`updateComment?id=${id}&contentComment=${comment}`)
    },
    DeleteComment:(id)=>{
        return api.delete(`Comment/deleteComment?idComment=${id}`)
    }
}
