import { DISPLAY_MODAL, DISPLAY_MODAL1, DISPLAY_MODAL2, DISPLAY_MODAL3, DISPLAY_MODAL4, DISPLAY_MODAL5, HIDE_MODAL, HIDE_MODAL1, HIDE_MODAL2, HIDE_MODAL3, HIDE_MODAL4, HIDE_MODAL5 } from "../types/modalType";


const stateDefault = {
    isModal: false,
    isModal1: false,
    isModal2: false,
    isModal3: false,
    isModal4: false,
    isModal5: false,
}



export const modalReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DISPLAY_MODAL:{
            state.isModal = true;
            return {...state}
        };

        case HIDE_MODAL:{
            state.isModal = false;
            return {...state}
        };

        case DISPLAY_MODAL1: {
            state.isModal1 = true;
            return {...state}
        }

        case HIDE_MODAL1:{
            state.isModal1 = false;
            return {...state}
        };

        case DISPLAY_MODAL2: {
            state.isModal2 = true;
            return {...state}
        }

        case HIDE_MODAL2:{
            state.isModal2 = false;
            return {...state}
        };

        case DISPLAY_MODAL3: {
            state.isModal3 = true;
            return {...state}
        }

        case HIDE_MODAL3:{
            state.isModal3 = false;
            return {...state}
        };

        case DISPLAY_MODAL4: {
            state.isModal4 = true;
            return {...state}
        }

        case HIDE_MODAL4:{
            state.isModal4 = false;
            return {...state}
        };

        case DISPLAY_MODAL5: {
            state.isModal5 = true;
            return {...state}
        }

        case HIDE_MODAL5:{
            state.isModal5 = false;
            return {...state}
        };


        default: {
            return {...state}
        }
    }
}