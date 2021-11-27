import React from 'react';
//import { propTypes } from 'react-bootstrap/esm/Image';
import { connect } from 'react-redux';
import { setMainViewApp } from '../../redux/actions';


function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
    };
}

class SingleCityDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityId: props.cityId,
            cityName : props.cityName,
            cityCountCompanies: props.cityCountCompanies
        }
    }

    render() {
        return (
            <button className="cityButton">
            <div className="singleCityButton">
                <div className="leftCityButton">{this.state.cityName}</div>
                <div className="rightCityButton">{this.state.cityCountCompanies}</div>
            </div>
            </button>
        )
    }

}
const SingleCity = connect(
    null,
    mapDispatchToProps
)(SingleCityDis);
export default SingleCity;