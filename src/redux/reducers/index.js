import {combineReducers} from 'redux';
import tokenReducer from './token';
import appStateReducer from './appState';
import loaderReducer from './loader';
import loggedUserIdReducer from './loggedUserId';
import mainViewReducer from './mainViewAppState';
import mainAppAlertReducer from './mainAppAlert';


const rootReducer = combineReducers({
    token: tokenReducer,
    appState: appStateReducer,
    loggedUserId: loggedUserIdReducer,
    isLoading: loaderReducer,
    mainViewAppState: mainViewReducer,
    mainAppAlert:mainAppAlertReducer
})

export default rootReducer;