import { combineReducers } from "redux";

import posts from "./posts";
import users from "./users";
import profiles from "./profiles";
import alerts from "./alerts";

const rootReducer = combineReducers({
    posts,
    users,
    profiles,
    alerts
});

export default rootReducer;
