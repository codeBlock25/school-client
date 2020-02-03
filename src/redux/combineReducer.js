import { combineReducers } from "redux"
import { navigationReducer } from "./reducers/navigation"

const rootReducer = combineReducers({
    nav: navigationReducer,
})

export default rootReducer