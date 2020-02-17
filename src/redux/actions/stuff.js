import { STATUS } from "../types/stuff"


export const StuffAction = (payload)=>{
    return {
        type: STATUS,
        payload: payload
    }
}