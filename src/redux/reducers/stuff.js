import { STATUS } from "../types/stuff";

const initailState = {
    status: "student"
}


export const StuffReducer = (state = initailState, action) =>{
    switch (action.type) {
        case STATUS: return {
            ...state,
            status: action.payload
        }
        default: return{...state}
    }
}