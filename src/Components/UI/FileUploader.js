import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';

class Fileuploader extends Component {

    state = {
        name: '',
        isUploading: false,
        fileURL: ''
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        if(nextProps.defaultImg) {
            return nextState = {
                name: nextProps.defaultImgName,
                fileURL: nextProps.defaultImg 
            }
        }
        return null;
    }

    handleUploadStart = () => this.setState({ isUploading: true });
    
    handleUploadError = () => this.setState({ isUploading: false })

    handleUploadSuccess = (filename) => {
        console.log(filename)

        this.setState({
            name: filename,
            isUploading: false
        });

        firebase.storage().ref(this.props.dir)
            .child(filename)
            .getDownloadURL()
            .then(url => {
                console.log(url);

                this.setState({ fileURL: url });
            });
        
        this.props.filename(filename);
    }

    uploadAgain = () => {
        this.setState({
            name: '',
            isUploading: false,
            fileURL: ''
        });
        this.props.resetImage();
    }

    render() {
        return (
            <div>
                {
                    !this.state.fileURL ? 
                        <div>
                            <div className="label_inputs">{this.props.tag}</div>
                            <FileUploader
                                accept="image/*"
                                name="image"
                                randomizeFilename
                                storageRef={firebase.storage().ref(this.props.dir)}
                                onUploadStart={ this.handleUploadStart }
                                onUploadError={ this.handleUploadError }
                                onUploadSuccess={ this.handleUploadSuccess }
                            />
                        </div>
                    : null
                }
                {
                    this.state.isUploading ? 
                        <div className="admin_progress">
                            <CircularProgress style={{color:'#FDB927'}}/>
                        </div>
                    : null
                }
                {
                    this.state.fileURL ?
                        <div className="image_upload_container">
                            <img 
                                style={{width:'42vw'}}
                                src={this.state.fileURL} 
                                alt={this.state.name}/>
                            
                            <div className="remove" onClick={() => this.uploadAgain()}>
                                Remove
                            </div>
                        </div>
                    : null
                }
            </div>
        );
    }
}

export default Fileuploader;