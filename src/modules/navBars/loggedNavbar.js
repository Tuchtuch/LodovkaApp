import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../../redux/actions';
import { setAppstate } from '../../redux/actions';
import Logo from '../../images/logo_navbar.png';
import '../../styles/ButtonLogin.css';
import firebase from 'firebase/compat/app'; //v9
import { APPSTATE_LOGGED_OFF } from '../../redux/constants/action_types';

function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
        setAppstate: appState => dispatch(setAppstate(appState)),
    };
}

class LoggedNavbarDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    logout(){
        firebase.auth().signOut();
        this.props.setAppstate(APPSTATE_LOGGED_OFF);
    }


    render(){
        return(
            <div className="navBar">
                <div className="logoNavBar"><img src={Logo} alt ="Logo" /></div>
                <div className="logginButtons"><button className="NavbarButton" onClick={()=>this.logout()}>Wyloguj się</button></div>
            </div>
        )
    }

}
const LoggedNavbar = connect(
    null,
    mapDispatchToProps
)(LoggedNavbarDis);
export default LoggedNavbar;