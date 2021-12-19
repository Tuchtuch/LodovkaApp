import { SET_SUB_APP_VIEW_STATE } from "../constants/action_types";

const initialState = {
  subViewAppState: 1
};

function subVeiwReducer(state = initialState, action) {
  if (action.type === SET_SUB_APP_VIEW_STATE) {
    return Object.assign({}, state, {
      subViewAppState: action.payload
      });
  }
  return state;
}

export default subVeiwReducer;