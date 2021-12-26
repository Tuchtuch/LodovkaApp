import React from 'react';
import { connect } from 'react-redux';
import { setSubViewApp } from './redux/actions';
import { setAppstate } from './redux/actions';
import { setLoggedUserId } from './redux/actions';
import { APPSTATE_LOGGED_AS_USER } from './redux/constants/action_types';
import LoginLogo from './images/loginLogo.png';
import Close from './images/icons/close.png';
import firebase from '@firebase/app-compat';

function mapDispatchToProps(dispatch) {
    return {
        setSubViewApp: subViewAppState => dispatch(setSubViewApp(subViewAppState)),
        setAppstate: appState => dispatch(setAppstate(appState)),
        setLoggedUserId: loggedUserId => dispatch(setLoggedUserId(loggedUserId))
    };
}

class RegisterPanelDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameReg : '',
            passwordReg : '',
            confirmPasswordReg: '',
        }
    }
    showOverflow(){
        document.getElementsByTagName("body")[0].style.overflow = 'visible';
        document.getElementsByClassName("registerWindowOverflow")[0].style.display = 'none';
    }
    register(){
        if(this.state.passwordReg===this.state.confirmPasswordReg){
            firebase.auth()
            .createUserWithEmailAndPassword(this.state.userNameReg, this.state.passwordReg)
            .then((userCredential) => {
                // Signed in 
               // const user = userCredential.user;
               this.props.setLoggedUserId(userCredential.user.email);
                this.props.setAppstate(APPSTATE_LOGGED_AS_USER);
                this.showOverflow();
                this.props.setSubViewApp(1);
                // ...
              })
              .catch((error) => {
                //const errorCode = error.code;
                //const errorMessage = error.message;
                // ..
              });
        }
        else {
            console.log("Złe hasła")
        }
    }

    srtInputValue(property, val) {
        val = val.trim();
        this.setState({
            [property]: val
        })
    }

    render() {
        return (
            <div className="registerWindowOverflow" >
                <div className="loginWindow">
                    <div className="loginCentering"><img src={LoginLogo} alt="Logo"/><img src={Close} alt="X" className="closeButton" onClick={()=>this.showOverflow()}/></div>
                    <div className="loginBody">
                    Mail<br />
                    <input className="LoginWindowInput" type="text"   onChange={(e) => this.setState({userNameReg: e.target.value })}/><br />
                    Hasło<br />
                    <input className="LoginWindowInput" type="password"  onChange={(e) => this.setState({passwordReg: e.target.value })}/><br />
                    Powtórz Hasło<br />
                    <input className="LoginWindowInput" type="password"  onChange={(e) => this.setState({confirmPasswordReg: e.target.value })}/>
                    </div>
                    <div className="loginCentering"><button className="LoginWindowButton" onClick={()=>this.register()}>Zarejestruj</button> </div>
                </div>
            </div>
        )
    }

}
const RegisterPanel = connect(
    null,
    mapDispatchToProps
)(RegisterPanelDis);
export default RegisterPanel;