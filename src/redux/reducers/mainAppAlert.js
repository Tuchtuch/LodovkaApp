import { SET_MAIN_APP_ALERT } from "../constants/action_types";

const initialState = {
  mainAppAlert: ''
};

function mainAppAlertReducer(state = initialState, action) {
  if (action.type === SET_MAIN_APP_ALERT) {
    return Object.assign({}, state, {
      mainAppAlert: action.payload
      });
  }
  return state;
}

export default mainAppAlertReducer;