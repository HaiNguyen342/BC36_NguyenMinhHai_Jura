import { PriorityService } from "../../services/PriorityService";
import { SET_ALL_PRIORITY } from "../types/priorityType";


export const priorityAction = {

    getAllPriorityAction: (id) => {
        return async (dispatch) => {
            try {
                const result = await PriorityService.getAllPriority(id)
                if (result.data.statusCode === 200) {
                    dispatch({
                        type: SET_ALL_PRIORITY,
                        payload: result.data.content
                    })
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },
}