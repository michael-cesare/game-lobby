import { combineReducers } from "redux";

import { lobby } from "@/features/lobby/reducer";

export const rootReducer = combineReducers({
  lobby,
});
