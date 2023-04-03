
import { api } from "../constants/api"


export const StatusService = {
    getAllStatus: () => {
        return api.get(`Status/getAll`)
    }
}
