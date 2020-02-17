import { combineReducers } from "redux"
import { navigationReducer } from "./reducers/navigation"
import { StuffReducer } from "./reducers/stuff"

const rootReducer = combineReducers({
    nav: navigationReducer,
    setting: StuffReducer
})

export default rootReducer