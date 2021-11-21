import { SET_APPSTATE } from "../constants/action_types";
import {APPSTATE_LOGGED_OFF} from '../constants/action_types';
import {APPSTATE_LOGGED_AS_USER} from '../constants/action_types';
import {APPSTATE_LOGGED_AS_WORKER} from '../constants/action_types';
import {APPSTATE_LOGGED_AS_ADMIN} from '../constants/action_types';

const initialState = {
  appState: APPSTATE_LOGGED_OFF
};

function appStateReducer(state = initialState, action) {
  if (action.type === SET_APPSTATE) {
    var roleId;
    switch(action.payload){
      case 1: roleId =APPSTATE_LOGGED_AS_USER;break;
      case 2: roleId= APPSTATE_LOGGED_AS_WORKER;break;
      case 3: roleId= APPSTATE_LOGGED_AS_ADMIN;break;
      default: roleId=APPSTATE_LOGGED_OFF;
    }


    return Object.assign({}, state, {
        appState: roleId
      });
  }
  return state;
}

export default appStateReducer;