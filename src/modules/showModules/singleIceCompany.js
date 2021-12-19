import React from 'react';
//import { propTypes } from 'react-bootstrap/esm/Image';
import { connect } from 'react-redux';
import { setMainViewApp } from '../../redux/actions';
import firebase from '@firebase/app-compat';

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

    componentDidMount(){
        this.ladujFirme()
    }

    async ladujFirme() {
        const snapshot = await firebase.firestore().collection('companies').doc(this.state.id).get();
        this.setState({
            company: snapshot.data()
        })
    }

    render() {
        return (
            <div className="showIceCompany">
            <div className="showIceCompanyLeft">TUTAJ FIRMA {this.state.id}</div>
            <div className="showIceCompanyCenter">&nbsp;</div>
            <div className="showIceCompanyRight">TUTAJ FIRMA</div>
            {console.log(this.state.company)}
        </div>
        )
    }

}
const SingleIceCompany = connect(
    null,
    mapDispatchToProps
)(SingleIceCompanyDis);
export default SingleIceCompany;