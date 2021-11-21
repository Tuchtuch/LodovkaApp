import { SET_TOKEN } from "../constants/action_types";

const initialState = {
  token: 'empty token'
};

function tokenReducer(state = initialState, action) {
  if (action.type === SET_TOKEN) {
    return Object.assign({}, state, {
        token: action.payload
      });
  }
  return state;
}

export default tokenReducer;