import {combineReducers} from 'redux';
import tokenReducer from './token';
import appStateReducer from './appState';
import loaderReducer from './loader';
import loggedUserIdReducer from './loggedUserId';
import mainViewReducer from './mainViewAppState';
import mainAppAlertReducer from './mainAppAlert';
import subVeiwAppStateReducer from './subViewAppState';
import iceCreamReducer from './iceCream';
import iceCompanyReducer from './iceCompany';



const rootReducer = combineReducers({
    token: tokenReducer,
    appState: appStateReducer,
    loggedUserId: loggedUserIdReducer,
    isLoading: loaderReducer,
    mainViewAppState: mainViewReducer,
    mainAppAlert:mainAppAlertReducer,
    subViewAppState: subVeiwAppStateReducer,
    iceCream : iceCreamReducer,
    iceCompany: iceCompanyReducer
})

export default rootReducer;