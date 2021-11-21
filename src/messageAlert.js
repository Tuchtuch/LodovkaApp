import React from 'react';
import { connect } from 'react-redux';
import { setMainAppAlert } from './redux/actions';
import Button from 'react-bootstrap/Button';

const mapStateToProps = state => {
    return { mainAppAlert: state.mainAppAlert.mainAppAlert };
};
function mapDispatchToProps(dispatch) {
    return {
        setMainAppAlert: mainAppAlert => dispatch(setMainAppAlert(mainAppAlert))
    };
}

class MessangerFunc extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {

        if (this.props.mainAppAlert !== '') {
            return (
                <div className="message_overflow">
                    <div className="message_overflow_window">
                        {this.props.mainAppAlert}
                        <br /><br />
                        <Button variant="success" onClick={() => this.props.setMainAppAlert('')}>
                            Ok
                        </Button>
                        <br /><br />
                    </div>
                </div>
            )

        } else return (<div className="loadedContent"></div>)
    }
}

const MessageAlert = connect(mapStateToProps, mapDispatchToProps)(MessangerFunc);

export default MessageAlert;