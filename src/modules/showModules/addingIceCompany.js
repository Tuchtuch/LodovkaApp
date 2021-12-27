import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../../redux/actions';
import firebase from '@firebase/app-compat';
import AddingIce from './addingIce';
import { setLoader } from '../../redux/actions';
import SetRecommends from './setRecommends';
import AddingFile from './addingFile';
//import GeoPoint from 'geopoint';

const mapStateToProps = state => {
    return {
        loggedUserId: state.loggedUserId.loggedUserId,
    };
};
function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
        setLoader: isLoading => dispatch(setLoader(isLoading))
    };
}

class AddingIceCompanyDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameOf: '',
            description: '',
            street: '',
            city: '',
            email: '',
            lat: '',
            long: '',
            minPrice: '',
            maxPrice: '',
            phoneNumber: '',
            welcomeMessage: '',
            myCompany: ''
        }
    }
    async ladujFirmy() {
        this.props.setLoader(true);
        const snapshot = await firebase.firestore().collection('companies').where("owner", "==", this.props.loggedUserId).get();
        this.setState({
            myCompany: snapshot.docs.map(doc => doc.id),
        });
        this.props.setLoader(false);
    }

    async dodaj() {
        if (this.state.nameOf.length > 20 || this.state.nameOf.length < 3) {
            alert('Nazwa może mieć od 3 do 20 znaków.')
        }
        else if (this.state.description.length < 10 || this.state.description.length > 200) {
            alert('Opis może mieć od 10 do 200 znaków.')
        }
        else if (this.state.street.length < 5 || this.state.street.length > 30) {
            alert('Ulica może mieć od 5 do 30 znaków.')
        }
        else if (this.state.city.length < 3 || this.state.city.length > 30) {
            alert('Miasto może mieć od 3 do 30 znaków.')
        }
        else if (this.state.email.length < 5 || this.state.email.length > 30) {
            alert('Email może mieć od 5 do 30 znaków.')
        }
        else if (this.state.lat.length < 1) {
            alert('Podaj współrzędną geograficzną')
        }
        else if (this.state.long.length < 1) {
            alert('Podaj współrzędną geograficzną')
        }
        else if (this.state.minPrice.length < 1) {
            alert('Podaj cenę minimalną.')
        }
        else if (this.state.maxPrice.length < 1) {
            alert('Podaj cenę maksymalną.')
        }
        else if (this.state.phoneNumber.length < 1) {
            alert('Podaj numer telefonu.')
        }
        else if (this.state.welcomeMessage.length < 10 || this.state.welcomeMessage.length > 30) {
            alert('Powitanie może mieć od 10 do 30 znaków.')
        }
        else {

            await firebase.firestore().collection("companies").add({
                city: this.state.city,
                description: this.state.description,
                email: this.state.email,
                firstColor: '000',
                firstIceRec: '',
                localisation: new firebase.firestore.GeoPoint(this.state.lat, this.state.long),
                lowerPrice: this.state.minPrice,
                maxPrice: this.state.maxPrice,
                name: this.state.nameOf,
                owner: this.props.loggedUserId,
                phonenumber: this.state.phoneNumber,
                powitanie: this.state.welcomeMessage,
                secondColor: '000',
                secondIceRec: '',
                street: this.state.street,
                thirdColor: '000',
                thirdIceRec: ''
            })
                .then((docRef) => {
                    console.log("Dodano dokumento numerze ID: ", docRef.id); this.ladujFirmy();
                })
                .catch((error) => {
                    console.error("Błąd: ", error);
                });
        };
    }

    componentDidMount() {
        this.ladujFirmy();
    }

    render() {
        if (this.state.myCompany.length === 0) {
            return (
                <div className="iceCompanyForm">
                    Nazwa lodziarni: <input className="formInput" type="text" onChange={(e) => this.setState({ nameOf: e.target.value })} /><br />
                    Opis lodziarni: <input className="formInput" type="text" onChange={(e) => this.setState({ description: e.target.value })} /><br />
                    Ulica lodziarni: <input className="formInput" type="text" onChange={(e) => this.setState({ street: e.target.value })} /><br />
                    Miasto lodziarni: <input className="formInput" type="text" onChange={(e) => this.setState({ city: e.target.value })} /><br />
                    Email lodziarni: <input className="formInput" type="text" onChange={(e) => this.setState({ email: e.target.value })} /><br />
                    Lokalizacja: <input className="formInput" type="text" onChange={(e) => this.setState({ lat: e.target.value })} /><input className="formButton" type="text" onChange={(e) => this.setState({ long: e.target.value })} /><br />
                    minimalna cena: <input className="formInput" type="text" onChange={(e) => this.setState({ minPrice: e.target.value })} /><br />
                    maxymalna cena: <input className="formInput" type="text" onChange={(e) => this.setState({ maxPrice: e.target.value })} /><br />
                    numer telefonu: <input className="formInput" type="text" onChange={(e) => this.setState({ phoneNumber: e.target.value })} /><br />
                    Powitanie: <input className="formInput" type="text" onChange={(e) => this.setState({ welcomeMessage: e.target.value })} /><br />
                    <button className="formButton" onClick={() => this.dodaj()}>Dodaj</button>
                </div>
            )
        }
        else {
            return (
                <div className="iceCompanyForm">Posiadasz już lodziarnię. <br />
                <AddingFile/>
                    ----------------------------<br />
                    <SetRecommends companyId={this.state.myCompany[0]} />
                    <br />Dodaj nowe lody.
                    <br />
                    <AddingIce companyId={this.state.myCompany[0]} />
                </div>

            )
        }
    }

}
const AddingIceCompany = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddingIceCompanyDis);
export default AddingIceCompany;