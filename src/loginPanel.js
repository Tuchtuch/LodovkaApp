import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from './redux/actions';
import { setAppstate } from './redux/actions';
import { setLoggedUserId } from './redux/actions';
import { APPSTATE_LOGGED_AS_USER } from './redux/constants/action_types';
import LoginLogo from './images/loginLogo.png';
import Close from './images/icons/close.png';
import firebase from '@firebase/app-compat';


function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
        setAppstate: appState => dispatch(setAppstate(appState)),
        setLoggedUserId: loggedUserId => dispatch(setLoggedUserId(loggedUserId))
    };
}

class LoginPanelDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
        }
    }
    showOverflow() {
        document.getElementsByTagName("body")[0].style.overflow = 'visible';
        document.getElementsByClassName("loginWindowOverflow")[0].style.display = 'none';
    }
    login() {

            firebase.auth()
            .signInWithEmailAndPassword(this.state.userName, this.state.password)
            .then((userCredential) => {
                // Signed in 
                this.props.setLoggedUserId(userCredential.user.email);
                this.props.setAppstate(APPSTATE_LOGGED_AS_USER);
                this.showOverflow();
                // ...
              })
              .catch((error) => {
                //const errorCode = error.code;
                //const errorMessage = error.message;
              });

    }

    srtInputValue(property, val) {
        val = val.trim();
        this.setState({
            [property]: val
        })
    }

    render() {
        return (
            <div className="loginWindowOverflow">
                <div className="loginWindow">
                    <div className="loginCentering"><img src={LoginLogo} alt="Logo" /><img src={Close} alt="X" className="closeButton" onClick={() => this.showOverflow()} /></div>
                    <div className="loginBody">
                        Login<br />
                        <input className="LoginWindowInput" type="text" onChange={(e) => this.setState({ userName: e.target.value })} /><br />
                        Hasło<br />
                        <input className="LoginWindowInput" type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                    </div>
                    <div className="loginCentering"><button className="LoginWindowButton" onClick={() => this.login()}>Zaloguj</button></div>
                </div>
            </div>
        )
    }

}
const LoginPanel = connect(
    null,
    mapDispatchToProps
)(LoginPanelDis);
export default LoginPanel;