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
        }
    }
/*
    uploadFile(){
        // 'file' comes from the Blob or File API
        var uuid = require("uuid");
        var id = uuid.v4();
        firebase.storage().ref().child('images/'+id).put(this.state.file);
    }*/

    uploadFile() {
        var metadata = {
            contentType: 'image/jpeg'
        };
        var uuid = require("uuid");
        var id = uuid.v4();
        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = firebase.storage().ref().child('images/'+id).put(this.state.file,metadata);
        
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    default:
                        console.log('Error');
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    default:
                        console.log('Error');
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
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
            var maxFileSize = 100000; //100KB~
            var ext = this.state.file.name.split('.').pop();
            if (this.state.file.size > maxFileSize) return false;
            if (!imageExt.includes(ext)) return false;
            return true;
        }
    }

    onChange(e) {
        var file = e.target.files;
        //console.log(file[0]);
        this.setState({ file: file[0] });
    }
    showButton() {
        if (this.imageValidator()) {
            return (
                <button onClick={() => this.uploadFile()}>Dodaj</button>
            )
        }
        else {
            return (
                <button disabled>Dodaj</button>
            )
        }
    }

    render() {
        console.log(this.imageValidator())
        return (
            <div className="iceForm">
                <input type="file" onChange={this.onChange} accept="image/png, image/jpeg, image/jpg" />
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