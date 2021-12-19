import { SET_APPSTATE } from "../constants/action_types";
import {APPSTATE_LOGGED_OFF} from '../constants/action_types';

const initialState = {
  appState: APPSTATE_LOGGED_OFF
};

function appStateReducer(state = initialState, action) {
  if (action.type === SET_APPSTATE) {
    return Object.assign({}, state, {
        appState: action.payload
      });
  }
  return state;
}

export default appStateReducer;