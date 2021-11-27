import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from './redux/actions';
import LoginLogo from './images/loginLogo.png';


function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
    };
}

class LoginPanelDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="loginWindowOverflow">
                <div className="loginWindow">
                    <div className="loginCentering"><img src={LoginLogo} alt="Logo"/></div>
                    <div className="loginBody">
                    Login<br />
                    <input className="LoginWindowInput" type="text"/><br />
                    Hasło<br />
                    <input className="LoginWindowInput" type="password"/>
                    </div>
                    <div className="loginCentering"><button className="LoginWindowButton">Zaloguj</button></div>
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