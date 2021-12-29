import React from 'react';
import { connect } from 'react-redux';
import { setSubViewApp } from '../../redux/actions';
import firebase from '@firebase/app-compat';
import { Form } from 'react-bootstrap';
import { setLoader } from '../../redux/actions';
import AddingFile from './addingFile';
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
var id = 0;
class EditIcesDis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ices: [],
            icesId: [],
            companyId: this.props.companyId,
            iceToEditId: '',
            iceToEdit: '',
            viewState: 0,
            // --------- Poniżej od loda
            american: false,
            description: '',
            freshy: false,
            fruity: false,
            icing: false,
            italy: false,
            milky: false,
            nameOf: '',
            price: '',
            producer: '',
            salty: false,
            sherbet: false,
            sour: false,
            withWaffle: false,
            withnuts: false,
        }
    }

    async ladujLody() {
        this.props.setLoader(true);
        const snapshot = await firebase.firestore().collection('icecreams').where("companyId", "==", this.state.companyId).get();
        this.setState({
            ices: snapshot.docs.map(doc => doc.data()),
            icesId: snapshot.docs.map(doc => doc.id),
        });
        this.props.setLoader(false);
    }
    async ladujLoda() {
        this.props.setLoader(true);
        const snapshot = await firebase.firestore().collection('icecreams').doc(this.state.iceToEditId).get();
        this.setState({
            iceToEdit: snapshot.data(),
        });
        this.setState({
            nameOf: this.state.iceToEdit.name,
            description: this.state.iceToEdit.description,
            producer: this.state.iceToEdit.producer,
            price: this.state.iceToEdit.price
        })
        this.props.setLoader(false);
    }
    componentDidMount() {
        this.ladujLody();
    }

    editNext() {
        if (this.state.iceToEditId !== '') {
            this.ladujLoda();
            this.setState({
                viewState: 1
            })
        }
        else {
            alert('Wybierz loda!')
        }
    }

    showEditIceMode() {
        return (
            <div className="iceForm">
                <h3 className="headerOption">Edytuj loda</h3>
                Nazwa loda: <input className="formInput" type="text" defaultValue={this.state.iceToEdit.name} onChange={(e) => this.setState({ nameOf: e.target.value })} /><br />
                Opis loda: <input className="formInput" type="text" defaultValue={this.state.iceToEdit.description} onChange={(e) => this.setState({ description: e.target.value })} /><br />
                producent loda: <input className="formInput" type="text" defaultValue={this.state.iceToEdit.producer} onChange={(e) => this.setState({ producer: e.target.value })} /><br />
                Cena loda: <input className="formInput" type="text" defaultValue={this.state.iceToEdit.price} onChange={(e) => this.setState({ price: e.target.value })} /><br />
                <h3 className="headerOption">Właściwości loda</h3>
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
                <button className="subEditOption" onClick={() => this.edytuj()}>Edytuj</button>
                <h3 className="headerOption">Wybierz zdjęcie powyższego loda</h3>
                <AddingFile option={1} iceCreamId={this.state.iceToEditId} />
            </div>
        )
    }

    async edytuj() {
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
            await firebase.firestore().collection("icecreams").doc(this.state.iceToEditId).update({
                american: this.state.american,
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
                .then(() => {
                    console.log("Document successfully updated!");
                    this.props.setLoader(false);
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                    this.props.setLoader(false);
                });
            this.props.setSubViewApp(1);
            this.props.setSubViewApp(3);
        }
    }

    iceToSelect = iceId => {
        var helper = id;
        id++;
        if (helper < this.state.ices.length) {
            return (
                <option key={iceId} value={iceId}>{this.state.ices[helper].name}</option>
            )
        }

    }

    iceMaper() {
        id = 0;
        return (this.state.icesId.map(this.iceToSelect))
    }

    renderSwitch() {
        switch (this.state.viewState) {
            case 0:
                return (
                    <div>
                        <div className="iceEdit">
                            Wybierz loda:
                            <Form.Select aria-label="Wybierz pierwszą rekomendację" className="iceProp" onChange={(e) => this.setState({ iceToEditId: e.target.value })}>
                                <option key='default' value='default'>(wybierz)</option>
                                {this.iceMaper()}
                            </Form.Select>
                        </div>
                        <button className="subEditOption" onClick={() => this.editNext()}>Edytuj</button></div>
                )
            case 1:
                return (
                    <div>
                        {this.showEditIceMode()}
                    </div>
                )
            default: return (<div>Błąd</div>)
        }
    }

    render() {
        return (
            <div className="iceForm">
                {this.renderSwitch()}
            </div>
        )

    }

}
const EditIces = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditIcesDis);
export default EditIces;