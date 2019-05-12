import React, { Component } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';

import FormField from '../../UI/FormFields';
import { validate } from '../../../miscellaneous';
import FileUploader from '../../UI/FileUploader';

import { firebasePlayers, firebaseDB, firebase } from '../../../firebase';


class AddEditPlayers extends Component {
    state = {
        playerId: '',  
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        players: [],
        formData: {
            firstname: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player First Name',
                    name: 'firstname_input',
                    type: 'text'
                },
                validation: {
                    required: true                
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Last Name',
                    name: 'lastname_input',
                    type: 'text'
                },
                validation: {
                    required: true                
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            number: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Number',
                    name: 'number_input',
                    type: 'number'
                },
                validation: {
                    required: true                
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            position: {
                element: 'select',
                value: '',
                config: {
                    label: 'Player Position',
                    name: 'select_position',
                    type: 'select', 
                    options: [
                        { key: "Center", value: "Center" },
                        { key: "Center-Forward", value: "Center-Forward" },
                        { key: "Forward", value: "Forward" },
                        { key: "Guard", value: "Guard" },
                        { key: "Guard-Forward", value: "Guard-Forward" }
                    ]
                },
                validation: {
                    required: true                
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }
        }
    }

    componentDidMount() {
        const playerId = this.props.match.params.id;

        if(!playerId) {
            // add player
            this.setState({
                formType: 'Add Player'
            })  
        } else {
            // edit player    
        }
    }


    updateForm(element, content='') {
        const newFormData = { ...this.state.formData };
        const newElement = { ...newFormData[element.id] };

        if(content === '') {
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content;
        }

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[element.id] = newElement;
        
        this.setState({
            formError: false,
            formData: newFormData
        })
    }

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if (formIsValid) {
            // submit form
            if(this.state.formType === 'Edit Player') {
                
            } else {
                // add player to database
                firebasePlayers.push(dataToSubmit).then(() => {
                    this.props.history.push('/admin_players')
                }).catch(error => {
                    this.setState({
                        formError: true
                    })
                })
            }
            
        } else {
            this.setState({ formError: true })
        }
    }

    resetImage = () => {
        const newFormData = {...this.state.formData};
        newFormData['image'].value = '';
        newFormData['image'].valid = false;
        this.setState({
            defaultImg: '',
            formData: newFormData
        })
    }

    storeFilename = (filename) => {
        this.updateForm({ id: 'image' }, filename)
    }

    render() {
        // console.log(this.state.formData)
        return (
            <AdminLayout>
                <h2>{this.state.formType}</h2>

                <div className="editplayer_wrapper">                
                    <div className="editplayer_wrapper">
                        <div>
                        <form onSubmit={(event) => this.submitForm(event)}>

                            <FileUploader
                                dir={"players"}  
                                tag={"Player Image"}
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formData.image.value}
                                resetImage={() => this.resetImage()}
                                filename={(filename) => this.storeFilename(filename)}
                            />

                            <FormField
                                id={'firstname'}
                                formData={this.state.formData.firstname}
                                change={(element)=> this.updateForm(element)}
                            />

                            <FormField
                                id={'lastname'}
                                formData={this.state.formData.lastname}
                                change={(element)=> this.updateForm(element)}
                            />

                            <FormField
                                id={'number'}
                                formData={this.state.formData.number}
                                change={(element)=> this.updateForm(element)}
                            />

                            <FormField
                                id={'position'}
                                formData={this.state.formData.position}
                                change={(element)=> this.updateForm(element)}
                            />

                            <div className="success_label">
                                {this.state.formSuccess}
                            </div>
                            {
                                this.state.formError ? 
                                    <div className="error_label">
                                        Something went wrong
                                    </div>
                                : null
                            }

                            <div className="admin_submit">
                                <button onClick={(event) => this.submitForm(event)}>
                                    {this.state.formType}
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AddEditPlayers;