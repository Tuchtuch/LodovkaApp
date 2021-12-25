import React from 'react';
//import { propTypes } from 'react-bootstrap/esm/Image';
import { connect } from 'react-redux';
import { setMainViewApp } from '../../redux/actions';
import firebase from '@firebase/app-compat';
import Iframe from 'react-iframe';



function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
    };
}

class SingleIceCompanyDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            id: props.id
        }
    }

    componentDidMount() {
        this.ladujFirme()
    }

    async ladujFirme() {
        const snapshot = await firebase.firestore().collection('companies').doc(this.state.id).get();
        this.setState({
            company: snapshot.data()
        })
    }

    generujLink() {
        var lat = Object(this.state.company.localisation)._lat;
        var long = Object(this.state.company.localisation)._long;

        return "https://maps.google.com/maps?q=" + lat + ", " + long + "&z=15&output=embed";

    }

    render() {
        return (
            <div className="IceCompanyMain">
                <div className="showIceCompany">
                    <div className="showIceCompanyLeft">TUTAJ FIRMA {this.state.id}</div>
                    <div className="showIceCompanyCenter">&nbsp;</div>
                    <div className="showIceCompanyRight"><h2 className="companyWelcome">{this.state.company.powitanie}</h2><br />{this.state.company.description}<br /><br />{this.state.company.city}, ul. {this.state.company.street}</div>
                    {console.log(this.state.company)}
                </div>
                <div className="bottomInfo">
                    Za informację na stronie&nbsp;
                    <b>{this.state.company.name}</b>
                    &nbsp;odpowiada:&nbsp;
                    <b>{this.state.company.email}</b>
                </div>
                <div className="detailsInCompany">
                    <div className="productsInCompany">
                        <div className="iceInCompany">
                            <div className="iceInCompanyImg">IMG</div>
                            <div className="iceInCompanyCenter">center
                                <div className="iceInCompanyRight">tu</div>
                            </div>
                        </div>
                        <div className="iceInCompany">
                            <div className="iceInCompanyImg">IMG</div>
                            <div className="iceInCompanyCenter">center
                                <div className="iceInCompanyRight">tu</div>
                            </div>
                        </div>
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