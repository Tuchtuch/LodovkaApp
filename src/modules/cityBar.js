import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../redux/actions';
import '../styles/ButtonSearchbar.css';
import SingleCity from './showModules/singleCity';


function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
    };
}

class CityBarDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <div className="cityBar">
                    <div className="cityBarLeft">Zobacz co oferuje Twoje miasto...</div>
                    <div className="cityBarRight">14/200</div>
                </div>
                <div className="cityList">
                    <SingleCity cityName="Lubań" cityCountCompanies="5" /><SingleCity cityName="Wrocław" cityCountCompanies="20" />
                </div>
            </div>
        )
    }

}
const CityBar = connect(
    null,
    mapDispatchToProps
)(CityBarDis);
export default CityBar;