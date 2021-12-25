import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../redux/actions';
import { setSubViewApp } from '../redux/actions';
import SingleLodovkaCenter from './showModules/singleLodovkaCenter';
import SingleIceCompany from './showModules/singleIceCompany';
import firebase from '@firebase/app-compat';
//import { doc, onSnapshot } from "firebase/firestore";


function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
        setSubViewApp: subViewAppState => dispatch(setSubViewApp(subViewAppState))
    };
}
const mapStateToProps = state => {
    return {
        mainViewAppState: state.mainViewAppState.mainViewAppState,
        subViewAppState: state.subViewAppState.subViewAppState,
        iceCream: state.iceCream.iceCream,
        iceCompany: state.iceCompany.iceCompany
    };
};
var currentId = 0;
class MainAppDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: '',
            companiesIds: [],
        }
    }

    iceCompanyToSingle = icecompany => {
        if (icecompany.firstIceRec !== '' && icecompany.secondIceRec !== '' && icecompany.thirdIceRec !== '') {
            return (
                <SingleLodovkaCenter
                    id={this.state.companiesIds[currentId]}
                    key={this.state.companiesIds[currentId++]}
                    title={icecompany.name}
                    firstRecommend={icecompany.firstIceRec}
                    secondRecommend={icecompany.secondIceRec}
                    thirdRecommend={icecompany.thirdIceRec}
                    firstColor={icecompany.firstColor}
                    secondColor={icecompany.secondColor}
                    thirdColor={icecompany.thirdColor}
                    lowerPrice={icecompany.lowerPrice}
                    maxPrice={icecompany.maxPrice}
                />
            )
        }
        else{
            currentId++;
        }
    }


    async ladujFirmy() {
        const snapshot = await firebase.firestore().collection('companies').get();
        this.setState({
            companies: snapshot.docs.map(doc => doc.data()),
            companiesIds: snapshot.docs.map(doc => doc.id)
        })
    }
    componentDidMount() {
        this.ladujFirmy();
    }
    maperIceCompany() {
        return (this.state.companies.map(this.iceCompanyToSingle))
    }

    showIceCompaniesModule() {
        if (this.state.companies.length > 0) {
            return (
                this.maperIceCompany()
            )
        }
        else {
            return ("brak firm")
        }
    }



    renderSwitch() {
        switch (this.props.subViewAppState) {
            case 1: return (
                <div className="mainApp">
                    {this.showIceCompaniesModule()}
                </div>
            );
            case 2:
                if (this.props.iceCream) {
                    return (
                        <div className="mainApp">
                            <SingleIceCompany id={this.props.iceCompany} />
                        </div>
                    );
                }
                else {
                    return (
                        <div className="mainApp">
                            Nieoczekiwany błąd
                        </div>
                    );
                }

            default: return (<div>{console.log(this.props.subViewAppState)}DOMYŚLNY</div>);
        }
    }
    render() {
        return (
            this.renderSwitch()

        )
    }

}
const MainApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainAppDis);
export default MainApp;