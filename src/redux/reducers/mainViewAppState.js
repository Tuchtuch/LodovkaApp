import { SET_MAIN_APP_VIEW_STATE } from "../constants/action_types";

const initialState = {
  mainViewAppState: 0
};

function mainViewReducer(state = initialState, action) {
  if (action.type === SET_MAIN_APP_VIEW_STATE) {
    return Object.assign({}, state, {
      mainViewAppState: action.payload
      });
  }
  return state;
}

export default mainViewReducer;