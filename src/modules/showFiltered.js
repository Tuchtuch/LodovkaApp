import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../redux/actions';
import { setSubViewApp } from '../redux/actions';
import firebase from '@firebase/app-compat';
import noImg from '../images/noImg.png';
import { setLoader } from '../redux/actions';
import SingleLodovkaCenter from './showModules/singleLodovkaCenter';
import { setIceCompany } from '../redux/actions';



function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
        setSubViewApp: subViewAppState => dispatch(setSubViewApp(subViewAppState)),
        setLoader: isLoading => dispatch(setLoader(isLoading)),
        setIceCompany: iceCompany => dispatch(setIceCompany(iceCompany)),

    };
}
var currentId = 0;
class ShowFilteredDis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredIceCompany: [],
            filteredIceCompanyIds: [],
            filteredIces: [],
            filteredIcsIds: [],
            filterValue: this.props.filteredValue
        }
    }
    PokazLoda(key) {
        this.props.setIceCompany(key);
        this.props.setSubViewApp(5);
    }

    componentDidMount() {
        this.ladujFirmy();
        this.ladujLody();
    }
    async ladujLody() {
        this.props.setLoader(true);
        const snapshot = await firebase.firestore().collection('icecreams').get();
        this.setState({
            filteredIces: snapshot.docs.map(doc => doc.data()),
            filteredIds: snapshot.docs.map(doc => doc.id)
        })
        this.props.setLoader(false)
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
            if (icecompany.name.includes(this.state.filterValue)) {
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
    iceToSingle = ice => {
        if (ice.name.includes(this.state.filterValue)) {
            return (
                <div key={ice.name + ice.companyId} className="iceInCompany" onClick={() => this.PokazLoda(ice.companyId)}>
                    <div className="iceInCompanyImg">{this.showIceImage(ice.imgLink)}</div>
                    <div className="iceInCompanyCenter">
                        <h2 className="iceH2">{ice.name}</h2>
                        <h3 className="iceH3">{ice.description}</h3>
                    </div>
                    <div className="iceInCompanyRight">{ice.price} PLN</div>
                </div>
            )
        }
    }

    iceMaper() {
        return (this.state.filteredIces.map(this.iceToSingle))
    }
    render() {
        return (
            <div className="mainApp">
                <h3 className='headerOption'>Znalezione firmy:</h3>
                {this.showIceCompaniesModule()}
                <h3 className='headerOption'>Znalezione lody:</h3>
                {this.iceMaper()}
            </div>
        )
    }

}
const ShowFiltered = connect(
    null,
    mapDispatchToProps
)(ShowFilteredDis);
export default ShowFiltered;