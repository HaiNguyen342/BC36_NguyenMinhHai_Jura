
import { api } from "../constants/api"


export const ProjectCategoryService = {
    getAllProjectCategory: () => {
        return api.get(`ProjectCategory`)
    }
}
