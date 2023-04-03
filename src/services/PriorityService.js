
import { api } from "../constants/api"


export const PriorityService = {
    getAllPriority: (id) => {
        if(id !== '') {
        return api.get(`Priority/getAll?id=${id}`)
        } 
        return api.get(`Priority/getAll`)
    }
}
