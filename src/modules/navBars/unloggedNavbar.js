import React from 'react';
import { connect } from 'react-redux';
import { setSubViewApp } from '../../redux/actions';
import Logo from '../../images/logo_navbar.png';
import '../../styles/ButtonLogin.css';
import Robot from '../../images/robotHelper.png';

function mapDispatchToProps(dispatch) {
    return {
        setSubViewApp: subViewAppState => dispatch(setSubViewApp(subViewAppState)),
    };
}

class UnloggedNavbarDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    openLogin(){
        document.getElementsByTagName("body")[0].style.overflow = 'hidden';
        document.getElementsByClassName("loginWindowOverflow")[0].style.display = 'block';
        document.getElementsByClassName("registerWindowOverflow")[0].style.display = 'none';
    }
    openRegister(){
        document.getElementsByTagName("body")[0].style.overflow = 'hidden';
        document.getElementsByClassName("registerWindowOverflow")[0].style.display = 'block';
        document.getElementsByClassName("loginWindowOverflow")[0].style.display = 'none';
    }


    render(){
        return(
            <div className="navBar">
                <div className="logoNavBar"><img src={Logo} alt ="Logo"  onClick={()=>this.props.setSubViewApp(1)} /></div>
                <div className="logginButtons"><button className="NavbarButton" onClick={()=>this.openLogin()}>Zaloguj się</button><button className="NavbarButton" onClick={()=>this.openRegister()}>Dołącz</button></div>
                <div className="robot"><img src={Robot} alt="Robot" onClick={() => this.props.setSubViewApp(4)} /></div>
            </div>
        )
    }

}
const UnloggedNavbar = connect(
    null,
    mapDispatchToProps
)(UnloggedNavbarDis);
export default UnloggedNavbar;