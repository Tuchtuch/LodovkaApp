import { SET_TOKEN } from "../constants/action_types";
import { SET_APPSTATE } from "../constants/action_types";
import { SET_LOGGED_USERID } from "../constants/action_types";
import { SET_LOADER } from "../constants/action_types";
import { SET_MAIN_APP_VIEW_STATE } from "../constants/action_types";
import { SET_MAIN_APP_ALERT } from "../constants/action_types";

export function setToken(payload) {
  return { type: SET_TOKEN, payload };
}
export function setAppstate(payload) {
  return { type: SET_APPSTATE, payload };
}
export function setLoggedUserId(payload) {
  return { type: SET_LOGGED_USERID, payload };
}
export function setLoader(payload) {
  return { type: SET_LOADER, payload };
}
export function setMainAppAlert(payload) {
  return { type: SET_MAIN_APP_ALERT, payload };
}
export function setMainViewApp(payload) {
  return { type: SET_MAIN_APP_VIEW_STATE, payload };
}