import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../../redux/actions';
import firebase from 'firebase/compat/app'; //v9
//import 'firebase/compat/firestore'; //v9
//import 'firebase/compat/auth'; //v9
//import 'firebase/compat/storage';
import Iframe from 'react-iframe';
import { setLoader } from '../../redux/actions';
import noImg from '../../images/noImg.png';


function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
        setLoader: isLoading => dispatch(setLoader(isLoading))
    };
}

class SingleIceCompanyDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            id: props.id,
            ices: [],
        }
    }

    componentDidMount() {
        this.ladujFirme();
        this.ladujLody();
    }

    async ladujFirme() {
        this.props.setLoader(true);
        const snapshot = await firebase.firestore().collection('companies').doc(this.state.id).get();
        this.setState({
            company: snapshot.data()
        })
        this.props.setLoader(false);
    }
    async ladujLody() {
        this.props.setLoader(true);
        const snapshot = await firebase.firestore().collection('icecreams').where("companyId", "==", this.state.id).get();
        this.setState({
            ices: snapshot.docs.map(doc => doc.data()),
        });
        this.props.setLoader(false);
    }

    generujLink() {
        var lat = Object(this.state.company.localisation)._lat;
        var long = Object(this.state.company.localisation)._long;
        return "https://maps.google.com/maps?q=" + lat + ", " + long + "&z=15&output=embed";

    }
    showImage(imgLink){
        if(!imgLink){
            return (<img src={noImg} alt="img" />)
        }
        else {
            return (<img src={imgLink} className="singleIceCompanyImg" alt="logo"/>)
        }
    }
    showIceImage(imgLink){
        if(!imgLink){
            return (<img src={noImg} alt="img" />)
        }
        else {
            return (<img src={imgLink} className="singleIceImg" alt="logo"/>)
        }
    }
    iceToSingle = ice => {
        return (
            <div className="iceInCompany">
                <div className="iceInCompanyImg">{this.showIceImage(ice.imgLink)}</div>
                <div className="iceInCompanyCenter">
                    <h2 className="iceH2">{ice.name}</h2>
                    <h3 className="iceH3">{ice.description}</h3>
                </div>
                <div className="iceInCompanyRight">{ice.price} PLN</div>
            </div>
        )
    }
    iceMaper() {
        return (this.state.ices.map(this.iceToSingle))
    }

    render() {
        return (
            <div className="IceCompanyMain">
                <div className="showIceCompany">
                    <div className="showIceCompanyLeft">{this.showImage(this.state.company.imgLink)}</div>
                    <div className="showIceCompanyCenter">&nbsp;</div>
                    <div className="showIceCompanyRight"><h2 className="companyWelcome">{this.state.company.powitanie}</h2><br />{this.state.company.description}<br /><br />{this.state.company.city}, ul. {this.state.company.street}</div>
                </div>
                <div className="bottomInfo">
                    Za informację na stronie&nbsp;
                    <b>{this.state.company.name}</b>
                    &nbsp;odpowiada:&nbsp;
                    <b>{this.state.company.email}</b>
                </div>
                <div className="detailsInCompany">
                    <div className="productsInCompany">
                        {this.iceMaper()}
                    </div>
                    <div className="mapOfCompany">
                        <Iframe title="mapa" src={this.generujLink()} width="500" height="500" frameborder="0"></Iframe>
                    </div>
                </div>

            </div>
        )
    }
}
const SingleIceCompany = connect(
    null,
    mapDispatchToProps
)(SingleIceCompanyDis);
export default SingleIceCompany;