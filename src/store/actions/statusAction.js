import { StatusService } from "../../services/StatusService";
import { SET_ALL_STATUS } from "../types/statusType";


export const statusAction = {

    getAllStatusAction: () => {
        return async (dispatch) => {
            try {
                const result = await StatusService.getAllStatus()
                if (result.data.statusCode === 200) {
                    dispatch({
                        type: SET_ALL_STATUS,
                        payload: result.data.content
                    })
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },
}