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

    render(){
        return(
            <div className="navBar">
                <div className="logoNavBar"><img src={Logo} alt ="Logo" /></div>
                <div className="logginButtons"><button className="NavbarButton">Zaloguj się</button><button className="NavbarButton">Dołącz</button></div>
            </div>
        )
    }

}
const UnloggedNavbar = connect(
    null,
    mapDispatchToProps
)(UnloggedNavbarDis);
export default UnloggedNavbar;