import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../redux/actions';
import '../styles/ButtonSearchbar.css';
import SingleCity from './showModules/singleCity';
import firebase from '@firebase/app-compat';
import { setLoader } from '../redux/actions';
import { setSubViewApp } from '../redux/actions';

function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
        setLoader: isLoading => dispatch(setLoader(isLoading)),
        setSubViewApp: subViewAppState => dispatch(setSubViewApp(subViewAppState)),
    };
}
var arrayCities = [];
var arrayCounter = [];
class CityBarDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
        }
    }

    async ladujFirmy() {
        this.props.setLoader(true);
        const snapshot = await firebase.firestore().collection('companies').get();
        this.setState({
            companies: snapshot.docs.map(doc => doc.data()),
        })
        this.props.setLoader(false)
    }
    componentDidMount() {
        this.ladujFirmy();
    }

    

    cityMaper() {
        this.state.companies.map(this.zliczMiasta);
        return (arrayCities.map(this.cityToSingle))
    }

    zliczMiasta = city => {
        if (arrayCities.includes(city.city)) {
            ++arrayCounter[arrayCities.indexOf(city.city)];
        }
        else {
            arrayCities.push(city.city);
            arrayCounter.push(1);
        }
    }

    cityToSingle = city => {
        return (
            <SingleCity 
            key={city} 
            cityName={city} 
            cityCountCompanies={arrayCounter[arrayCities.indexOf(city)]} 
            />
        )
    }


    render() {
        return (
            <div>
                <div className="cityBar">
                    <div className="cityBarLeft">Zobacz co oferuje Twoje miasto...</div>
                    <div className="cityBarRight">{this.state.companies.length + 1}/200</div>
                </div>
                <div className="cityList">
                    {this.cityMaper()}
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