import { SET_LOADER } from "../constants/action_types";

const initialState = {
  isLoading: false
};

function loaderReducer(state = initialState, action) {
  if (action.type === SET_LOADER) {
    return Object.assign({}, state, {
      isLoading: action.payload
      });
  }
  return state;
}

export default loaderReducer;