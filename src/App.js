import React from 'react';
import { connect } from 'react-redux';
import UnloggedNavbar from './modules/navBars/unloggedNavbar';
import SearchBar from './modules/searchBar';

import { APPSTATE_LOGGED_OFF, APPSTATE_LOGGED_AS_USER, APPSTATE_LOGGED_AS_ADMIN } from './redux/constants/action_types';

const mapStateToProps = state => {
  return { appState: state.appState.appState, token: state.token.token };
};

const funcApp = ({ appState }) => {

  switch (appState) {
    case APPSTATE_LOGGED_OFF: return (
      <div className="App">
        <UnloggedNavbar/>
        <SearchBar/>
      </div>
    );
    case APPSTATE_LOGGED_AS_USER: return (
      <div className="App">
        Stronka zalogowana
      </div>
    )
    case APPSTATE_LOGGED_AS_ADMIN: return (
      <div className="App">
        Panel admina
      </div>
    )
    default: alert('Nieoczekiwany błąd');
  }


}
const App = connect(mapStateToProps)(funcApp);
export default App;
