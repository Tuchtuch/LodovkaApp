import { SET_LOGGED_USERID } from "../constants/action_types";

const initialState = {
  loggedUserId: 0
};

function loggedUserIdReducer(state = initialState, action) {
  if (action.type === SET_LOGGED_USERID) {
    return Object.assign({}, state, {
      loggedUserId: action.payload
      });
  }
  return state;
}

export default loggedUserIdReducer;