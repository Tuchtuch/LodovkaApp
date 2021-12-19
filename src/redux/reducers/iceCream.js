import { SET_ICECREAM } from "../constants/action_types";

const initialState = {
  iceCream: ''
};

function iceCreamReducer(state = initialState, action) {
  if (action.type === SET_ICECREAM) {
    return Object.assign({}, state, {
      iceCream: action.payload
      });
  }
  return state;
}

export default iceCreamReducer;