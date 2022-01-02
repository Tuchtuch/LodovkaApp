import React from 'react';
//import { propTypes } from 'react-bootstrap/esm/Image';
import { connect } from 'react-redux';
import { setMainViewApp } from '../../redux/actions';
import { setSubViewApp } from '../../redux/actions';


function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
        setSubViewApp: subViewAppState => dispatch(setSubViewApp(subViewAppState)),
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
    filtrujMiasta(val){
        this.props.setSubViewApp(7);
        this.props.setMainViewApp(val);
    }

    render() {
        return (
            <button className="cityButton" onClick={()=>this.filtrujMiasta(this.state.cityName)}>
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