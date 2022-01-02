import React from 'react';
import { connect } from 'react-redux';
import MainApp from './modules/mainApp';
import UnloggedNavbar from './modules/navBars/unloggedNavbar';
import LoggedNavbar from './modules/navBars/loggedNavbar';
import CityBar from './modules/cityBar';
import LoginPanel from './loginPanel';
import RegisterPanel from './registerPanel';
import './styles/LoginWindow.css';
import { APPSTATE_LOGGED_OFF, APPSTATE_LOGGED_AS_USER, APPSTATE_LOGGED_AS_ADMIN } from './redux/constants/action_types';
import firebase from 'firebase/compat/app'; //v9
import 'firebase/compat/firestore'; //v9
import 'firebase/compat/auth'; //v9
import 'firebase/compat/storage';
//import {useAuthState} from 'react-firebase-hooks/auth';
//import {useCollectionData} from 'react-firebase-hooks/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyDTjM4fo4A6EVCiSegVL3ggC9fyMcyhuLQ",
  authDomain: "lodovkawebapp.firebaseapp.com",
  projectId: "lodovkawebapp",
  storageBucket: "lodovkawebapp.appspot.com",
  messagingSenderId: "528058781946",
  appId: "1:528058781946:web:3b4cb0d162fbdccaf8b943",
  measurementId: "G-PBV3XP9J7M"
})
//const auth = firebase.auth();
//const firestore = firebase.firestore();

const mapStateToProps = state => {
  return { appState: state.appState.appState, token: state.token.token };
};

const funcApp = ({ appState }) => {

  switch (appState) {
    case APPSTATE_LOGGED_OFF: return (
      <div className="App">
        <LoginPanel/>
        <RegisterPanel/>
        <UnloggedNavbar/>
        <MainApp/>
        <CityBar/>
      </div>
    );
    case APPSTATE_LOGGED_AS_USER: return (
      <div className="App">
        <LoginPanel/>
        <RegisterPanel/>
        <LoggedNavbar/>
        <MainApp/>
        <CityBar/>
      </div>
    )
    case APPSTATE_LOGGED_AS_ADMIN: return (
      <div className="App">
        Panel admina, jeśli będzie
      </div>
    )
    default: alert('Nieoczekiwany błąd');
  }


}
const App = connect(mapStateToProps)(funcApp);
export default App;
