import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../redux/actions';
import { setSubViewApp } from '../redux/actions';
import SingleLodovkaCenter from './showModules/singleLodovkaCenter';
import SingleIceCompany from './showModules/singleIceCompany';
import firebase from '@firebase/app-compat';
import AddingIceCompany from '../modules/showModules/addingIceCompany';
import { setLoader } from '../redux/actions';
import RobotFull from '../images/robotFull.png'
//import { doc, onSnapshot } from "firebase/firestore";


function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
        setSubViewApp: subViewAppState => dispatch(setSubViewApp(subViewAppState)),
        setLoader: isLoading => dispatch(setLoader(isLoading))
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
            allIces: '',
            allIcesIds: []
        }
    }

    async ladujLody() {
        this.props.setLoader(true);
        const snapshot = await firebase.firestore().collection('icecreams').get();
        this.setState({
            allIces: snapshot.docs.map(doc => doc.data()),
            allIcesIds: snapshot.docs.map(doc => doc.id)
        })
        this.props.setLoader(false)
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
                    imgLink={icecompany.imgLink}
                />
            )
        }
        else {
            currentId++;
        }
    }


    async ladujFirmy() {
        this.props.setLoader(true);
        const snapshot = await firebase.firestore().collection('companies').get();
        this.setState({
            companies: snapshot.docs.map(doc => doc.data()),
            companiesIds: snapshot.docs.map(doc => doc.id)
        })
        this.props.setLoader(false)
    }
    componentDidMount() {
        this.ladujFirmy();
        this.ladujLody();
    }
    maperIceCompany() {
        currentId = 0;
        return (this.state.companies.map(this.iceCompanyToSingle))
    }
    filtruj(element) {
        if(element.fruity===true || element.fruity==='true') return true; else return false
    }
    ekspertowySystem() {
        var ices = [];
        ices = this.state.allIces;
        ices = ices.filter(this.filtruj);
        var pytania = [
            'Czy masz ochotę na loda amerykańskiego?',          //[0] - american
            'Czy zjadłbyś coś owocowego?',                      //[1] - fruity
            'Czy chciałbyś loda z polewą?',                     //[2] - icing
            'Może naszła Cię ochota na loda włoskiego?',        //[3] - italy
            'Czy interesuje Cię lód mleczny?',                  //[4] - milky
            'Czy chciałbyś spróbować słonych smaków?',          //[5] - salty
            'Może orzeźwiłbyś się sorbetem?',                   //[6] - sherbet
            'A może zjadłbyś coś kwaskowatego?',                //[7] - sour
            'Masz ochotę pochrupać wafelka?',                   //[8] - withWaffle
            'Masz ochotę na orzeszki?'                          //[9] - withnuts
        ]
        var cechy = [
            'american',
            'fruity',
            'icing',
            'italy',
            'milky',
            'salty',
            'sherbet',
            'sour',
            'withWaffle',
            'withnuts'
        ]

        var step = 0;
        var mainTitle = '';
        var subText = '';
        if (step === 0) {
            mainTitle = "Witaj!";
            subText = "Jeżeli nie moższ się zdecydować na co masz dzisiaj ochotę, powiedz mi co lubisz. Wybiorę dla Ciebie najsmaczniejsze lody. Wystarczy, że odpowiesz na parę pytań...";
        }

        if (this.state.allIces.length > 3) {
            console.log(ices)
            return (
                <div className="eskpertowyTable">
                    <div className="trescChmury"><h2 className="expertH2">{mainTitle}</h2><h3 className="expertH3">{subText}</h3></div>
                    <img src={RobotFull} alt="robotFull" />
                </div>
            )
        }
        else {
            //Wyświetl lody
        }

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
            case 3: return (
                <div className="mainApp">
                    <AddingIceCompany />
                </div>
            );
            case 4: return (
                <div className="mainApp">
                    {this.ekspertowySystem()}
                </div>
            );
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