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
            thirdRec: ''
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
                        Wybierz loda:
                        <Form.Select aria-label="Wybierz pierwszą rekomendację" className="iceProp" onChange={(e) => this.setState({ firstRec: e.target.value })}>
                            {this.iceMaper()}
                        </Form.Select>
                    </div>
                    <div className="secondRec">
                        Wybierz loda:
                        <Form.Select aria-label="Wybierz pierwszą rekomendację" className="iceProp" onChange={(e) => this.setState({ secondRec: e.target.value })}>
                            {this.iceMaper()}
                        </Form.Select>
                    </div>
                    <div className="thirdRec">
                        Wybierz loda:
                        <Form.Select aria-label="Wybierz pierwszą rekomendację" className="iceProp" onChange={(e) => this.setState({ thirdRec: e.target.value })}>
                            {this.iceMaper()}
                        </Form.Select>
                    </div>
                </div>
                <button className="formButton" onClick={() => this.ustaw()}>Ustaw</button>
            </div>
        )

    }

}
const SetRecommends = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetRecommendsDis);
export default SetRecommends;