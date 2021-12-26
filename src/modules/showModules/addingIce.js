import React from 'react';
import { connect } from 'react-redux';
import { setSubViewApp } from '../../redux/actions';
import firebase from '@firebase/app-compat';
import { Form } from 'react-bootstrap';
import { setLoader } from '../../redux/actions';
//import GeoPoint from 'geopoint';

const mapStateToProps = state => {
    return {
        loggedUserId: state.loggedUserId.loggedUserId,
    };
};
function mapDispatchToProps(dispatch) {
    return {
        setSubViewApp: subViewAppState => dispatch(setSubViewApp(subViewAppState)),
        setLoader: isLoading => dispatch(setLoader(isLoading))
    };
}

class AddingIceDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            american: false,
            companyId: this.props.companyId,
            description: false,
            freshy: false,
            fruity: false,
            icing: false,
            italy: false,
            milky: false,
            nameOf: false,
            price: false,
            producer: false,
            salty: false,
            sherbet: false,
            sour: false,
            withWaffle: false,
            withnuts: false,
        }
    }


    async dodaj() {
        if (this.state.nameOf.length > 20 || this.state.nameOf.length < 3) {
            alert('Nazwa może mieć od 3 do 20 znaków.')
        }
        else if (this.state.description.length < 10 || this.state.description.length > 200) {
            alert('Opis może mieć od 10 do 200 znaków.')
        }
        else if (this.state.producer.length < 5 || this.state.producer.length > 30) {
            alert('Nazwa producenta może mieć od 5 do 30 znaków.')
        }
        else if (this.state.price.length < 1) {
            alert('Podaj cenę.')
        }
        else {
            this.props.setLoader(true);
            await firebase.firestore().collection("icecreams").add({
                american: this.state.american,
                companyId: this.state.companyId,
                description: this.state.description,
                fruity: this.state.fruity,
                icing: this.state.icing,
                italy: this.state.italy,
                milky: this.state.milky,
                name: this.state.nameOf,
                price: this.state.price,
                producer: this.state.producer,
                salty: this.state.salty,
                sherbet: this.state.sherbet,
                sour: this.state.sour,
                withWaffle: this.state.withWaffle,
                withnuts: this.state.withnuts
            })
                .then((docRef) => {
                    console.log("Dodano loda o numerze ID: ", docRef.id);
                    this.props.setLoader(false);
                })
                .catch((error) => {
                    console.error("Błąd: ", error);
                    this.props.setLoader(false);
                });
                this.props.setSubViewApp(1);
                this.props.setSubViewApp(3);
        };
    }


    render() {
        return (
            <div className="iceForm">
                Nazwa loda: <input className="formInput" type="text" onChange={(e) => this.setState({ nameOf: e.target.value })} /><br />
                Opis loda: <input className="formInput" type="text" onChange={(e) => this.setState({ description: e.target.value })} /><br />
                producent loda: <input className="formInput" type="text" onChange={(e) => this.setState({ producer: e.target.value })} /><br />
                Cena loda: <input className="formInput" type="text" onChange={(e) => this.setState({ price: e.target.value })} /><br />
                --------------------------------------<br />
                Czy amerykański:
                <Form.Select aria-label="Czy Amerykański" className="iceProp" onChange={(e) => this.setState({ american: e.target.value })}>
                    <option value={Boolean(false)}>Nie</option>
                    <option value={Boolean(true)}>Tak</option>
                </Form.Select>
                Czy owocowy:
                <Form.Select aria-label="Czy Owocowy" className="iceProp" onChange={(e) => this.setState({ fruity: e.target.value })}>
                    <option value={Boolean(false)}>Nie</option>
                    <option value={Boolean(true)}>Tak</option>
                </Form.Select>
                Czy ma polewę:
                <Form.Select aria-label="Czy ma polewę" className="iceProp" onChange={(e) => this.setState({ icing: e.target.value })}>
                    <option value={Boolean(false)}>Nie</option>
                    <option value={Boolean(true)}>Tak</option>
                </Form.Select>
                Czy jest włoski:
                <Form.Select aria-label="Czy jest włoski" className="iceProp" onChange={(e) => this.setState({ italy: e.target.value })}>
                    <option value={Boolean(false)}>Nie</option>
                    <option value={Boolean(true)}>Tak</option>
                </Form.Select>
                Czy jest mleczny:
                <Form.Select aria-label="Czy jest mleczny" className="iceProp" onChange={(e) => this.setState({ milky: e.target.value })}>
                    <option value={Boolean(false)}>Nie</option>
                    <option value={Boolean(true)}>Tak</option>
                </Form.Select>
                Czy jest słonawy:
                <Form.Select aria-label="Czy jest słonawy" className="iceProp" onChange={(e) => this.setState({ salty: e.target.value })}>
                    <option value={Boolean(false)}>Nie</option>
                    <option value={Boolean(true)}>Tak</option>
                </Form.Select>
                Czy jest sorbetowy:
                <Form.Select aria-label="Czy jest sorbetowy" className="iceProp" onChange={(e) => this.setState({ sherbet: e.target.value })}>
                    <option value={Boolean(false)}>Nie</option>
                    <option value={Boolean(true)}>Tak</option>
                </Form.Select>
                Czy jest kwaskowy:
                <Form.Select aria-label="Czy jest kwaskowy" className="iceProp" onChange={(e) => this.setState({ sour: e.target.value })}>
                    <option value={Boolean(false)}>Nie</option>
                    <option value={Boolean(true)}>Tak</option>
                </Form.Select>
                Czy ma wafelek:
                <Form.Select aria-label="Czy ma wafelek" className="iceProp" onChange={(e) => this.setState({ withWaffle: e.target.value })}>
                    <option value={Boolean(false)}>Nie</option>
                    <option value={Boolean(true)}>Tak</option>
                </Form.Select>
                Czy ma orzechy:
                <Form.Select aria-label="Czy ma orzechy" className="iceProp" onChange={(e) => this.setState({ withnuts: e.target.value })}>
                    <option value={Boolean(false)}>Nie</option>
                    <option value={Boolean(true)}>Tak</option>
                </Form.Select>
                <button className="formButton" onClick={() => this.dodaj()}>Dodaj</button>
            </div>
        )

    }

}
const AddingIce = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddingIceDis);
export default AddingIce;