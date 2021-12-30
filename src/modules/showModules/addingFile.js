import React from 'react';
import { connect } from 'react-redux';
import { setSubViewApp } from '../../redux/actions';
import firebase from 'firebase/compat/app'; //v9
import 'firebase/compat/firestore'; //v9
import 'firebase/compat/auth'; //v9
import 'firebase/compat/storage';
import { setLoader } from '../../redux/actions';


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

class AddingFileDis extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            file: '',
            option: this.props.option,
            companyId: this.props.companyId,
            iceCreamId: this.props.iceCreamId
        }
    }

    uploadFile() {
        var path;
        if (this.state.option === 0) {
            path = 'companies';
        }
        else if (this.state.option === 1) {
            path = 'icecreams';
        }
        var metadata = {
            contentType: 'image/jpeg'
        };
        this.props.setLoader(true);
        var uuid = require("uuid");
        var id = uuid.v4();
        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = firebase.storage().ref().child(path + '/' + id).put(this.state.file, metadata);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                //var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        this.props.setLoader(false);
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    default:
                        console.log('Error');
                        this.props.setLoader(false);
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        this.props.setLoader(false);
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        this.props.setLoader(false);
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        this.props.setLoader(false);
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    default:
                        console.log('Error');
                        this.props.setLoader(false);
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    // console.log('File available at', downloadURL);
                    this.props.setLoader(false);
                    if (this.state.option === 0) {
                        //Jak firma
                        firebase.firestore().collection('companies')
                            .doc(this.state.companyId)
                            .update({
                                "imgLink": downloadURL,
                            });
                    }
                    else if (this.state.option === 1) {
                        //jak lód
                        firebase.firestore().collection('icecreams')
                            .doc(this.state.iceCreamId)
                            .update({
                                "imgLink": downloadURL,
                            });
                    }
                    this.props.setSubViewApp(1);
                    this.props.setSubViewApp(3);
                });

            }
        );
    }



    imageValidator() {
        var imageExt = ['png', 'jpg', 'jpeg'];
        if (!this.state.file) {
            return false;
        }
        else {
            var maxFileSize = 500000; //500KB~
            var ext = this.state.file.name.split('.').pop();
            if (this.state.file.size > maxFileSize) {
                alert('Za duży rozmiar! Max 500kB!');
                return false;
            }
            if (!imageExt.includes(ext)) {
                alert('Blędne rozszerzenie!');
                return false;
            }

            return true;
        }
    }

    onChange(e) {
        var file = e.target.files;
        this.setState({ file: file[0] });
    }
    showButton() {
        if (this.imageValidator()) {
            return (
                <button className="NavbarButton" onClick={() => this.uploadFile()}>Dodaj</button>
            )
        }
        else {
            return (
                <button className="NavbarButton" disabled>Dodaj</button>
            )
        }
    }

    render() {
        return (
            <div className="iceForm">
                <input className="fileButton" type="file" onChange={this.onChange} accept="image/png, image/jpeg, image/jpg" />
                {this.showButton()}
            </div>
        )

    }

}
const AddingFile = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddingFileDis);
export default AddingFile;