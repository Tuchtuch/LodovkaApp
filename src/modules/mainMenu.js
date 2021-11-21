import React from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import PlastSysLogo from '../images/plastsyslogo.png';
import UniPlastLogo from '../images/logo_uniplast.png';
import { setMainViewApp } from '../redux/actions';

function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
    };
}

class MainMenuDis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    changeMenu(id){
        this.props.setMainViewApp(0);
        setTimeout(function() { //Start the timer
            this.props.setMainViewApp(id); 
        }.bind(this), 1)
        
    }
    render() {
        return (
            <div className="mainMenu">
                <img className="menuPSlogo" src={PlastSysLogo} alt="logoPlastSys"/>
            <ListGroup>
                <ListGroup.Item onClick={() => this.changeMenu(1)}>START</ListGroup.Item>
                <ListGroup.Item onClick={() => this.changeMenu(2)}>KLIENCI</ListGroup.Item>
                <ListGroup.Item onClick={() => this.changeMenu(3)}>UMOWY</ListGroup.Item>
                <ListGroup.Item onClick={() => this.changeMenu(4)}>ZAMÓWIENIA</ListGroup.Item>
                <ListGroup.Item onClick={() => this.changeMenu(5)}>SERWISY</ListGroup.Item>
                <ListGroup.Item onClick={() => this.changeMenu(6)}>REKLAMACJE</ListGroup.Item>
                <ListGroup.Item onClick={() => this.changeMenu(7)}>MONTAŻE</ListGroup.Item>
                <ListGroup.Item onClick={() => this.changeMenu(8)}>FAKTURY</ListGroup.Item>
                <ListGroup.Item onClick={() => this.changeMenu(9)}>KONFIGURACJA</ListGroup.Item>
            </ListGroup>
            <img className="menuUPlogo" src={UniPlastLogo} alt="UniPlastLogo"/>
            </div>
        )
    }
}
const MainMenu = connect(
    null,
    mapDispatchToProps
)(MainMenuDis);
export default MainMenu;