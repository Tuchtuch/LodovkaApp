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
import noImg from '../images/noImg.png';
import { setIceCream } from '../redux/actions';
import { setIceCompany } from '../redux/actions';
import ShowFiltered from './showFiltered';
import '../styles/ButtonSearchbar.css';
import ShowFilteredCity from './showFilteredCity';

function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
        setSubViewApp: subViewAppState => dispatch(setSubViewApp(subViewAppState)),
        setLoader: isLoading => dispatch(setLoader(isLoading)),
        setIceCream: iceCream => dispatch(setIceCream(iceCream)),
        setIceCompany: iceCompany => dispatch(setIceCompany(iceCompany)),
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
            allIcesIds: [],
            step: 0,
            pytania: [],
            cechy: [],
            filteredValue: ''
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

    searchBar() {
        return (
            <div className="searchBar">
                <div className="topHeader">Zajrzyj do naszej Lodóvki i sprawdź najnowsze smaki...</div>
                <div className="searchInput"><input className="SearchbarText" type="text" onChange={(e) => this.setState({ filteredValue: e.target.value })} placeholder="Wyszukaj..." /><button className="Searchbar" onClick={()=>this.props.setSubViewApp(6)}>Szukaj...</button></div>
            </div>
        )
    }

    stepChanging(val) {
        this.zaladujPytania();
        this.ladujLody();
        this.ladujFirmy();
        this.setState({
            step: val
        })
    }
    stepChangingB(val, cech, cechBul, randVal) {
        var pomPytania = this.state.pytania;
        var pomCechy = this.state.cechy;
        pomPytania.splice(randVal, 1);
        pomCechy.splice(randVal, 1);
        this.setState({
            step: val,
            pytania: pomPytania,
            cechy: pomCechy,
            allIces: this.przefiltruj(this.state.allIces, cech, cechBul)
        })
    }
    zaladujPytania() {
        this.setState({
            pytania: [
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
            ],
            cechy: [
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
        })
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

    PokazLoda(key) {
        this.props.setIceCompany(key);
        this.props.setSubViewApp(5);
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
        this.zaladujPytania();
    }
    maperIceCompany() {
        currentId = 0;
        return (this.state.companies.map(this.iceCompanyToSingle))
    }

    przefiltruj(tab, cecha, cechaBool) {
        switch (cecha) {
            case 'american': if (cechaBool) { return (tab.filter(this.filtrujAmerican)) } else return (tab.filter(this.filtrujNieAmerican));
            case 'fruity': if (cechaBool) { return (tab.filter(this.filtrujFruity)) } else return (tab.filter(this.filtrujNieFruity))
            case 'italy': if (cechaBool) { return (tab.filter(this.filtrujItaly)) } else return (tab.filter(this.filtrujNieItaly))
            case 'milky': if (cechaBool) { return (tab.filter(this.filtrujMilky)) } else return (tab.filter(this.filtrujNieMilky))
            case 'salty': if (cechaBool) { return (tab.filter(this.filtrujSalty)) } else return (tab.filter(this.filtrujNieSalty))
            case 'sherbet': if (cechaBool) { return (tab.filter(this.filtrujSherbet)) } else return (tab.filter(this.filtrujNieSherbet))
            case 'sour': if (cechaBool) { return (tab.filter(this.filtrujSour)) } else return (tab.filter(this.filtrujNieSour))
            case 'withWaffle': if (cechaBool) { return (tab.filter(this.filtrujWaffle)) } else return (tab.filter(this.filtrujNieWaffle))
            case 'withnuts': if (cechaBool) { return (tab.filter(this.filtrujNuts)) } else return (tab.filter(this.filtrujNieNuts))
            default: return tab
        }
    }

    filtrujAmerican(element) {
        if (element.american === true || element.american === 'true') return true; else return false
    }
    filtrujFruity(element) {
        if (element.fruity === true || element.fruity === 'true') return true; else return false
    }
    filtrujItaly(element) {
        if (element.italy === true || element.italy === 'true') return true; else return false
    }
    filtrujMilky(element) {
        if (element.milky === true || element.milky === 'true') return true; else return false
    }
    filtrujSalty(element) {
        if (element.salty === true || element.salty === 'true') return true; else return false
    }
    filtrujSherbet(element) {
        if (element.sherbet === true || element.sherbet === 'true') return true; else return false
    }
    filtrujSour(element) {
        if (element.sour === true || element.sour === 'true') return true; else return false
    }
    filtrujWaffle(element) {
        if (element.withWaffle === true || element.withWaffle === 'true') return true; else return false
    }
    filtrujNuts(element) {
        if (element.withnuts === true || element.withnuts === 'true') return true; else return false
    }
    //FUNKCJE NIE
    filtrujNieAmerican(element) {
        if (element.american === false || element.american === 'false') return true; else return false
    }
    filtrujNieFruity(element) {
        if (element.fruity === false || element.fruity === 'false') return true; else return false
    }
    filtrujNieItaly(element) {
        if (element.italy === false || element.italy === 'false') return true; else return false
    }
    filtrujNieMilky(element) {
        if (element.milky === false || element.milky === 'false') return true; else return false
    }
    filtrujNieSalty(element) {
        if (element.salty === false || element.salty === 'false') return true; else return false
    }
    filtrujNieSherbet(element) {
        if (element.sherbet === false || element.sherbet === 'false') return true; else return false
    }
    filtrujNieSour(element) {
        if (element.sour === false || element.sour === 'false') return true; else return false
    }
    filtrujNieWaffle(element) {
        if (element.withWaffle === false || element.withWaffle === 'false') return true; else return false
    }
    filtrujNieNuts(element) {
        if (element.withnuts === false || element.withnuts === 'false') return true; else return false
    }

    iceMaper() {
        return (this.state.allIces.map(this.iceToSingle))
    }
    iceToSingle = ice => {
        return (
            <div className="iceInCompanyLink" onClick={() => this.PokazLoda(ice.companyId)}>
                <div className="iceInCompanyImg">{this.showIceImage(ice.imgLink)}</div>
                <div className="iceInCompanyCenter">
                    <h2 className="iceH2">{ice.name}</h2>
                    <h3 className="iceH3">{ice.description}</h3>
                </div>
                <div className="iceInCompanyRight">{ice.price} PLN</div>
            </div>
        )
    }
    ekspertowySystem() {
        var mainTitle = '';
        var subText = '';
        var button = '';
        var button1 = '';
        var button2 = '';
        var button3 = <button className="expertButton" onClick={() => this.stepChanging(1)}>Od nowa!</button>;
        var random = Math.floor(Math.random() * this.state.cechy.length);
        if (this.state.step === 0) {
            mainTitle = "Witaj!";
            subText = "Jeżeli nie moższ się zdecydować na co masz dzisiaj ochotę, powiedz mi co lubisz. Wybiorę dla Ciebie najsmaczniejsze lody. Wystarczy, że odpowiesz na parę pytań...";
            button = <button className="expertButton" onClick={() => this.stepChanging(1)}>Start!</button>;
            button1 = '';
            button2 = '';
        }
        else {
            mainTitle = "Hmmm..."
            subText = this.state.pytania[random];
            button = '';
            button1 = <button className="expertButton" onClick={() => this.stepChangingB(2, this.state.cechy[random], true, random)}>Tak!</button>
            button2 = <button className="expertButton" onClick={() => this.stepChangingB(2, this.state.cechy[random], false, random)}>Nie!</button>
        }


        if (this.state.allIces.length > 5 && this.state.cechy.length < 1) {
            return (
                <div className="eskpertowyTable">
                    <div className="trescChmury"><h2 className="expertH2">Niestety...</h2><h3 className="expertH3">Znaleziono zbyt dużo deserów, żeby coś zaproponować...</h3>
                        {button3}
                    </div>
                    <img src={RobotFull} alt="robotFull" />
                </div>
            )
        }
        else if (this.state.allIces.length > 5) {
            //Tutaj pętla systemu ekspertowego
            //console.log(ices)
            return (
                <div className="eskpertowyTable">
                    <div className="trescChmury"><h2 className="expertH2">{mainTitle}</h2><h3 className="expertH3">{subText}</h3>
                        {button}{button1}{button2}
                    </div>
                    <img src={RobotFull} alt="robotFull" />
                </div>
            )
        }
        else if (this.state.allIces.length <= 5 && this.state.allIces.length > 0) {
            return (
                <div>
                    <div className="eskpertowyTable">
                        <div className="trescChmury"><h2 className="expertH2">Już wiem!</h2><h3 className="expertH3">Sprawdź poniższe lody, na pewno masz na nie ochotę!</h3>
                            {button3}
                        </div>
                        <img src={RobotFull} alt="robotFull" />
                    </div>
                    <div className="proponowaneLody">{this.iceMaper()}</div>
                </div>
            )
        }
        else {
            return (
                <div className="eskpertowyTable">
                    <div className="trescChmury"><h2 className="expertH2">Niestety...</h2><h3 className="expertH3">Nie mamy w bazie lodów, które sprostają Twoim wymaganiom.</h3>
                        {button3}
                    </div>
                    <img src={RobotFull} alt="robotFull" />

                </div>
            )
        }

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
                <div>{this.searchBar()}
                    <div className="mainApp">
                        {this.showIceCompaniesModule()}
                    </div>
                </div>
            );
            case 2:
                if (this.props.iceCream) {
                    return (
                        <div>{this.searchBar()}
                            <div className="mainApp">
                                <SingleIceCompany id={this.props.iceCompany} />
                            </div>
                        </div>
                    );
                }
                else {
                    return (
                        <div>{this.searchBar()}
                            <div className="mainApp">
                                Nieoczekiwany błąd
                            </div>
                        </div>
                    );
                }
            case 3: return (
                <div>{this.searchBar()}
                    <div className="mainApp">
                        <AddingIceCompany />
                    </div>
                </div>
            );
            case 4: return (
                <div>{this.searchBar()}
                    <div className="mainApp">
                        {this.ekspertowySystem()}
                    </div>
                </div>
            );
            case 5: return (
                <div>{this.searchBar()}
                    <div className="mainApp">
                        <SingleIceCompany id={this.props.iceCompany} />
                    </div>
                </div>
            );
            case 6: return (
                <div>{this.searchBar()}
                    <div className="mainApp">
                        <ShowFiltered filteredValue={this.state.filteredValue} />
                    </div>
                </div>
            );
            case 7: return (
                <div>{this.searchBar()}
                    <div className="mainApp">
                        <ShowFilteredCity filteredValue={this.props.mainViewAppState} />
                    </div>
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