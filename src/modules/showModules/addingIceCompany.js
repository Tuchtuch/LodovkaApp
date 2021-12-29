import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../../redux/actions';
import firebase from '@firebase/app-compat';
import AddingIce from './addingIce';
import { setLoader } from '../../redux/actions';
import SetRecommends from './setRecommends';
import EditIces from './editIces';
import SingleIceCompany from './singleIceCompany';
import AddingFile from './addingFile';


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
            myCompany: '',
            viewState: 0,
            myCompanyObj: ''
        }
    }
    async ladujFirmy() {
        this.props.setLoader(true);
        const snapshot = await firebase.firestore().collection('companies').where("owner", "==", this.props.loggedUserId).get();
        this.setState({
            myCompany: snapshot.docs.map(doc => doc.id),
            myCompanyObj: snapshot.docs.map(doc => doc.data()),
        });
        if (this.state.myCompany.length !== 0) {
            this.setState({
                nameOf: this.state.myCompanyObj[0].name,
                description: this.state.myCompanyObj[0].description,
                street: this.state.myCompanyObj[0].street,
                city: this.state.myCompanyObj[0].city,
                email: this.state.myCompanyObj[0].email,
                lat: this.state.myCompanyObj[0].localisation._lat,
                long: this.state.myCompanyObj[0].localisation._long,
                minPrice: this.state.myCompanyObj[0].lowerPrice,
                maxPrice: this.state.myCompanyObj[0].maxPrice,
                phoneNumber: this.state.myCompanyObj[0].phonenumber,
                welcomeMessage: this.state.myCompanyObj[0].powitanie,
            })
        }
        this.props.setLoader(false);
    }
    async update() {
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
            this.props.setLoader(true);
            await firebase.firestore().collection("companies").doc(this.state.myCompany[0]).update({
                city: this.state.city,
                description: this.state.description,
                email: this.state.email,
                localisation: new firebase.firestore.GeoPoint(this.state.lat, this.state.long),
                lowerPrice: this.state.minPrice,
                maxPrice: this.state.maxPrice,
                name: this.state.nameOf,
                phonenumber: this.state.phoneNumber,
                powitanie: this.state.welcomeMessage,
                street: this.state.street,
            })
                .then(() => {
                    this.props.setLoader(false);
                    console.log("Edytowano"); this.ladujFirmy(); this.setViewSet(0);
                })
                .catch((error) => {
                    this.props.setLoader(false);
                    console.error("Błąd: ", error);
                });
            this.props.setLoader(false);
        };
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
            this.props.setLoader(true);
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
                    this.props.setLoader(false);
                    console.log("Dodano dokumento numerze ID: ", docRef.id); this.ladujFirmy();
                })
                .catch((error) => {
                    this.props.setLoader(false);
                    console.error("Błąd: ", error);
                });
            this.props.setLoader(false);
        };
    }

    componentDidMount() {
        this.ladujFirmy();
    }

    renderSwitch() {
        switch (this.state.viewState) {
            case 0:
                if (this.state.myCompany.length === 0) {
                    return (
                        <div>
                            <h3 className="headerOption">Dodaj nową lodziarnię</h3>
                            Nazwa lodziarni: <input className="formInput" type="text" onChange={(e) => this.setState({ nameOf: e.target.value })} /><br />
                            Opis lodziarni: <input className="formInput" type="text" onChange={(e) => this.setState({ description: e.target.value })} /><br />
                            Ulica lodziarni: <input className="formInput" type="text" onChange={(e) => this.setState({ street: e.target.value })} /><br />
                            Miasto lodziarni: <input className="formInput" type="text" onChange={(e) => this.setState({ city: e.target.value })} /><br />
                            Email lodziarni: <input className="formInput" type="text" onChange={(e) => this.setState({ email: e.target.value })} /><br />
                            Lokalizacja: <input className="formInput" type="text" onChange={(e) => this.setState({ lat: e.target.value })} /><input className="formInput" type="text" onChange={(e) => this.setState({ long: e.target.value })} /><br />
                            minimalna cena: <input className="formInput" type="text" onChange={(e) => this.setState({ minPrice: e.target.value })} /><br />
                            maxymalna cena: <input className="formInput" type="text" onChange={(e) => this.setState({ maxPrice: e.target.value })} /><br />
                            numer telefonu: <input className="formInput" type="text" onChange={(e) => this.setState({ phoneNumber: e.target.value })} /><br />
                            Powitanie: <input className="formInput" type="text" onChange={(e) => this.setState({ welcomeMessage: e.target.value })} /><br />
                            <button className="subEditOption" onClick={() => this.dodaj()}>Dodaj</button>
                        </div>
                    )
                }
                else {
                    return (
                        <div className="iceCompanyForm">
                            {this.showMenu()}
                            <center><h3 className="viewComp">PONIŻEJ PODGLĄD LODZIARNI:</h3></center>
                            <SingleIceCompany id={this.state.myCompany[0]} />
                        </div>
                    )
                }

            case 1:
                return (
                    <div>
                        {this.showMenu()}
                        <h3 className="headerOption">Ustaw rekomendacje</h3>
                        <SetRecommends companyId={this.state.myCompany[0]} />
                        <h3 className="headerOption">Ustaw zdjęcie lodziarni</h3>
                        <AddingFile option={0} companyId={this.state.myCompany[0]} />
                        <h3 className="headerOption">Edytuj opis lodziarni</h3>
                        Nazwa lodziarni: <input className="formInput" type="text" defaultValue={this.state.myCompanyObj[0].name} onChange={(e) => this.setState({ nameOf: e.target.value })} /><br />
                        Opis lodziarni: <input className="formInput" type="text" defaultValue={this.state.myCompanyObj[0].description} onChange={(e) => this.setState({ description: e.target.value })} /><br />
                        Ulica lodziarni: <input className="formInput" type="text" defaultValue={this.state.myCompanyObj[0].street} onChange={(e) => this.setState({ street: e.target.value })} /><br />
                        Miasto lodziarni: <input className="formInput" type="text" defaultValue={this.state.myCompanyObj[0].city} onChange={(e) => this.setState({ city: e.target.value })} /><br />
                        Email lodziarni: <input className="formInput" type="text" defaultValue={this.state.myCompanyObj[0].email} onChange={(e) => this.setState({ email: e.target.value })} /><br />
                        Lokalizacja: <input className="formInput" type="text" defaultValue={this.state.myCompanyObj[0].localisation._lat} onChange={(e) => this.setState({ lat: e.target.value })} /><input className="formInput" type="text" defaultValue={this.state.myCompanyObj[0].localisation._long} onChange={(e) => this.setState({ long: e.target.value })} /><br />
                        minimalna cena: <input className="formInput" type="text" defaultValue={this.state.myCompanyObj[0].lowerPrice} onChange={(e) => this.setState({ minPrice: e.target.value })} /><br />
                        maxymalna cena: <input className="formInput" type="text" defaultValue={this.state.myCompanyObj[0].maxPrice} onChange={(e) => this.setState({ maxPrice: e.target.value })} /><br />
                        numer telefonu: <input className="formInput" type="text" defaultValue={this.state.myCompanyObj[0].phonenumber} onChange={(e) => this.setState({ phoneNumber: e.target.value })} /><br />
                        Powitanie: <input className="formInput" type="text" defaultValue={this.state.myCompanyObj[0].powitanie} onChange={(e) => this.setState({ welcomeMessage: e.target.value })} /><br />
                        <button className="subEditOption" onClick={() => this.update()}>Aktualizuj</button>

                    </div>
                )
            case 2:
                return (
                    <div>
                        {this.showMenu()}
                        <h3 className="headerOption">Dodaj loda</h3>
                        <AddingIce companyId={this.state.myCompany[0]} />
                    </div>
                )
            case 3:
                return (
                    <div>
                        {this.showMenu()}
                        <EditIces companyId={this.state.myCompany[0]} />
                    </div>
                )
            default:
                return (
                    <div>Nieznany bład</div>
                )
        }
    }
    showMenu() {
        return (
            <div>
                <button className='editOption' onClick={() => this.setViewSet(0)}>Pogląd lodziarni</button>
                <button className='editOption' onClick={() => this.setViewSet(1)}>Edytuj lodziarnię</button>
                <button className='editOption' onClick={() => this.setViewSet(2)}>Dodaj loda</button>
                <button className='editOption' onClick={() => this.setViewSet(3)}>Edytuj lody</button>
            </div>
        )
    }

    setViewSet(option) {
        this.setState({
            viewState: option
        })
    }

    render() {
        return (
            <div className="iceCompanyForm">
                {this.renderSwitch()}
            </div>
        )
    }

}
const AddingIceCompany = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddingIceCompanyDis);
export default AddingIceCompany;