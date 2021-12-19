import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../../redux/actions';
import Logo from '../../images/logo_navbar.png';
import '../../styles/ButtonLogin.css';


function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
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
                <div className="logoNavBar"><img src={Logo} alt ="Logo" /></div>
                <div className="logginButtons"><button className="NavbarButton" onClick={()=>this.openLogin()}>Zaloguj się</button><button className="NavbarButton" onClick={()=>this.openRegister()}>Dołącz</button></div>
            </div>
        )
    }

}
const UnloggedNavbar = connect(
    null,
    mapDispatchToProps
)(UnloggedNavbarDis);
export default UnloggedNavbar;