import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../../redux/actions';
import { setSubViewApp } from '../../redux/actions';
import { setAppstate } from '../../redux/actions';
import Logo from '../../images/logo_navbar.png';
import '../../styles/ButtonLogin.css';
import firebase from 'firebase/compat/app'; //v9
import { setLoggedUserId } from '../../redux/actions';
import { APPSTATE_LOGGED_OFF } from '../../redux/constants/action_types';
import Robot from '../../images/robotHelper.png';

function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
        setAppstate: appState => dispatch(setAppstate(appState)),
        setLoggedUserId: loggedUserId => dispatch(setLoggedUserId(loggedUserId)),
        setSubViewApp: subViewAppState => dispatch(setSubViewApp(subViewAppState))
    };
}

class LoggedNavbarDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    logout() {
        firebase.auth().signOut();
        this.props.setLoggedUserId('');
        this.props.setAppstate(APPSTATE_LOGGED_OFF);
        this.props.setSubViewApp(1);
        alert('Wylogowano!');
    }

    zarzadzaj() {
        this.props.setSubViewApp(3);
    }


    render() {
        return (
            <div className="navBar">
                <div className="logoNavBar"><img className="logoMain" src={Logo} alt="Logo" onClick={() => this.props.setSubViewApp(1)} /></div>
                <div className="logginButtons"><button className="NavbarButton" onClick={() => this.logout()}>Wyloguj się</button><button className="NavbarButton" onClick={() => this.zarzadzaj()}>Zarządzaj</button></div>
                <div className="robot"><img src={Robot} alt="Robot" onClick={() => this.props.setSubViewApp(4)} /></div>
            </div>
        )
    }

}
const LoggedNavbar = connect(
    null,
    mapDispatchToProps
)(LoggedNavbarDis);
export default LoggedNavbar;