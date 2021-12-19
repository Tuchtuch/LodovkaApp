import { SET_ICECOMPANY } from "../constants/action_types";

const initialState = {
  iceCompany: ''
};

function iceCompanyReducer(state = initialState, action) {
  if (action.type === SET_ICECOMPANY) {
    return Object.assign({}, state, {
      iceCompany: action.payload
      });
  }
  return state;
}

export default iceCompanyReducer;