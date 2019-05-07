import React, { Component } from 'react';
import FormField from '../UI/FormFields.js';
import { validate } from '../../miscellaneous';

class Login extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: ''
            }
        }
    }

    updateForm(element) {
        const newFormData = { ...this.state.formData };
        const newElement = { ...newFormData[element.id] };

        newElement.value = element.event.target.value;

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[element.id] = newElement;

        this.setState({
            formData: newFormData
        });
    }

    submitForm(event) {
        event.preventDefault();
    
        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if(formIsValid) {
            console.log(dataToSubmit)
        } else {
            this.setState({ formError: true })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="login_wrapper">

                    <form onSubmit={(event) => this.submitForm(event)}>
                        <h2>Please Login</h2>

                        <FormField
                            id={'email'}
                            formData={this.state.formData.email}
                            change={(element)=> this.updateForm(element)}
                        />

                        <FormField
                            id={'password'}
                            formData={this.state.formData.password}
                            change={(element)=> this.updateForm(element)}
                        />

                        <button onClick={(event) => this.submitForm(event)}>Login</button>
                    </form>

                </div>
            </div>
        );
    }
}

export default Login;