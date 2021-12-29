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
var id = 0;
class SetRecommendsDis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ices: [],
            icesId: [],
            companyId: this.props.companyId,
            firstRec: '',
            secondRec: '',
            thirdRec: '',
            firstColor: '#000000',
            secondColor: '#000000',
            thirdColor: '#000000',
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
    componentDidMount() {
        this.ladujLody();
    }

    async ustaw() {
        this.props.setLoader(true);
        if (this.state.firstRec !== '' && this.state.secondRec !== '' && this.state.thirdRec !== '') {
            await firebase.firestore().collection("companies").doc(this.state.companyId).update({
                firstIceRec: this.state.firstRec,
                secondIceRec: this.state.secondRec,
                thirdIceRec: this.state.thirdRec
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
        else {
            alert('Wybierz wszystkie rekomendacje!')
            this.props.setLoader(false);
        }
    }

    async zmienKolor() {
        this.props.setLoader(true);
        if (this.state.firstColor !== '' && this.state.secondColor !== '' && this.state.thirdColor !== '') {
            await firebase.firestore().collection("companies").doc(this.state.companyId).update({
                firstColor: this.state.firstColor,
                secondColor: this.state.secondColor,
                thirdColor: this.state.thirdColor
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
        else {
            alert('Wybierz wszystkie rekomendacje!')
            this.props.setLoader(false);
        }
    }

    iceToSelect = iceId => {
        var helper = id;
        id++;
        if (helper < this.state.icesId.length) {
            return (
                <option key={iceId} value={iceId}>{this.state.ices[helper].name}</option>
            )
        }
    }

    iceMaper() {
        id = 0;
        return (this.state.icesId.map(this.iceToSelect))
    }


    render() {
        return (
            <div className="iceForm">
                <div className="recFlex">
                    <div className="firstRec">
                        Wybierz pierwszą rekomendację:
                        <Form.Select aria-label="Wybierz pierwszą rekomendację" className="iceProp" onChange={(e) => this.setState({ firstRec: e.target.value })}>
                            <option key='default' value='default'>(wybierz)</option>
                            {this.iceMaper()}
                        </Form.Select>
                    </div>
                    <div className="secondRec">
                        Wybierz drugą rekomendację:
                        <Form.Select aria-label="Wybierz pierwszą rekomendację" className="iceProp" onChange={(e) => this.setState({ secondRec: e.target.value })}>
                            <option key='default' value='default'>(wybierz)</option>
                            {this.iceMaper()}
                        </Form.Select>
                    </div>
                    <div className="thirdRec">
                        Wybierz trzecią rekomendację:
                        <Form.Select aria-label="Wybierz pierwszą rekomendację" className="iceProp" onChange={(e) => this.setState({ thirdRec: e.target.value })}>
                            <option key='default' value='default'>(wybierz)</option>
                            {this.iceMaper()}
                        </Form.Select>
                    </div>
                </div>
                <button className="subEditOption" onClick={() => this.ustaw()}>Ustaw</button>
                <h3 className="headerOption">Kolory rekomendacji</h3>
                <div className="colorRec">Pierwszy kolor kropki:<br /><input type="color" onChange={(e) => this.setState({ firstColor: e.target.value })} /></div>
                <div className="colorRec">Drugi kolor kropki:<br /><input type="color" onChange={(e) => this.setState({ secondColor: e.target.value })} /></div>
                <div className="colorRec">Trzeci kolor kropki:<br /><input type="color" onChange={(e) => this.setState({ thirdColor: e.target.value })} /></div>
                <button className="subEditOption" onClick={() => this.zmienKolor()}>Ustaw</button>
            </div>
        )

    }

}
const SetRecommends = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetRecommendsDis);
export default SetRecommends;