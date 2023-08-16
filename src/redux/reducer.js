import { combineReducers } from "redux";

const memberReducer = (state = { members: [] }, action) => {
  switch (action.type) {
    case "SET_MEMBERS":
      return { ...state, members: action.payload };
    default:
      return state;
  }
};

const reducer = combineReducers({ memberReducer });
export default reducer;
