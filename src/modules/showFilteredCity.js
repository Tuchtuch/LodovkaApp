import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../redux/actions';
import { setSubViewApp } from '../redux/actions';
import firebase from '@firebase/app-compat';
import noImg from '../images/noImg.png';
import { setLoader } from '../redux/actions';
import SingleLodovkaCenter from './showModules/singleLodovkaCenter';
import { setIceCompany } from '../redux/actions';


const mapStateToProps = state => {
    return {
        mainViewAppState: state.mainViewAppState.mainViewAppState,
    };
};
function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
        setSubViewApp: subViewAppState => dispatch(setSubViewApp(subViewAppState)),
        setLoader: isLoading => dispatch(setLoader(isLoading)),
        setIceCompany: iceCompany => dispatch(setIceCompany(iceCompany)),

    };
}
var currentId = 0;
class ShowFilteredCityDis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredIceCompany: [],
            filteredIceCompanyIds: [],
            filterValue: this.props.filteredValue,
        }
    }
    PokazLoda(key) {
        this.props.setIceCompany(key);
        this.props.setSubViewApp(5);
    }

    componentDidMount() {
        this.ladujFirmy();
    }
    async ladujFirmy() {
        this.props.setLoader(true);
        const snapshot = await firebase.firestore().collection('companies').get();
        this.setState({
            filteredIceCompany: snapshot.docs.map(doc => doc.data()),
            filteredIceCompanyIds: snapshot.docs.map(doc => doc.id)
        })
        this.props.setLoader(false)
    }

    showIceImage(imgLink) {
        if (!imgLink) {
            return (<img src={noImg} alt="img" />)
        }
        else {
            return (<img src={imgLink} className="singleIceImg" alt="logo" />)
        }
    }
    showIceCompaniesModule() {
        if(this.state.filterValue!==this.props.mainViewAppState){
            this.setState({
                filterValue:this.props.mainViewAppState
            })
            this.ladujFirmy()
        }
        if (this.state.filteredIceCompany.length > 0) {
            return (
                this.maperIceCompany()
            )
        }
        else {
            return ("brak firm")
        }
    }
    maperIceCompany() {
        currentId = 0;
        return (this.state.filteredIceCompany.map(this.iceCompanyToSingle))
    }
    iceCompanyToSingle = icecompany => {
        if (icecompany.firstIceRec !== '' && icecompany.secondIceRec !== '' && icecompany.thirdIceRec !== '') {
            if (icecompany.city.includes(this.state.filterValue)) {
                return (
                    <SingleLodovkaCenter
                        id={this.state.filteredIceCompanyIds[currentId]}
                        key={this.state.filteredIceCompanyIds[currentId++]}
                        title={icecompany.name}
                        firstRecommend={icecompany.firstIceRec}
                        secondRecommend={icecompany.secondIceRec}
                        thirdRecommend={icecompany.thirdIceRec}
                        firstColor={icecompany.firstColor}
                        secondColor={icecompany.secondColor}
                        thirdColor={icecompany.thirdColor}
                        lowerPrice={icecompany.lowerPrice}
                        maxPrice={icecompany.maxPrice}
                        imgLink={icecompany.imgLink}
                    />
                )
            }
            else {
                currentId++;
            }
        }
        else {
            currentId++;
        }
    }


    render() {
        return (
            <div className="mainApp">
                <h3 className='headerOption'>Firmy w mieście {this.state.filterValue}:</h3>
                {this.showIceCompaniesModule()}
            </div>
        )
    }

}
const ShowFilteredCity = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowFilteredCityDis);
export default ShowFilteredCity;