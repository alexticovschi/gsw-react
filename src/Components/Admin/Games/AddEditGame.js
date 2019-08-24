import React, { Component } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';

import FormField from '../../UI/FormFields';
import { validate } from '../../../miscellaneous';

import { firebaseTeams, firebaseDB, firebaseGames } from '../../../firebase';
import { firebaseLooper } from '../../../miscellaneous';

import "./AddEditGame.css";

class AddEditGame extends Component {
    state = {
        gameId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formData: {
            date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Event date',
                    name: 'date_input',
                    type: 'date'
                },
                validation: {
                    required: true                
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a local team',
                    name: 'select_local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultLocal: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result local',
                    name: 'result_local_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select an away team',
                    name: 'select_away',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result away',
                    name: 'result_away_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            arena: {
                element: 'input',
                value: '',
                config: {
                    label: 'Arena',
                    name: 'arena_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    label: 'Team result',
                    name: 'select_result',
                    type: 'select',
                    options: [
                        { key: 'W', value: 'Win' },
                        { key: 'L', value: 'Lose' },
                        { key: 'n/a', value: 'n/a' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            final: {
                element: 'select',
                value: '',
                config: {
                    label: 'Game Played?',
                    name: 'select_played',
                    type: 'select',
                    options: [
                        { key: 'Yes', value: 'Yes' },
                        { key: 'No', value: 'No' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
        }
    }

    updateFields(match, teamOptions, teams, type, gameId) {
        const newFormData = {
            ...this.state.formData
        }

        for(let key in newFormData) {
            if(match) {
                newFormData[key].value = match[key];
                newFormData[key].valid = true;
            }
            if(key === 'local' || key === 'away') {
                newFormData[key].config.options = teamOptions;
            }

            this.setState({ 
                gameId,
                formType: type,
                formData: newFormData,
                teams 
            })
        }
    }

    componentDidMount() {
        const gameId = this.props.match.params.id;
        const getTeams = (game, type) => {
            firebaseTeams
                .once('value')
                .then(data => {
                    const teams = firebaseLooper(data);
                    const teamOptions = [];
                
                    data.forEach(team => {
                        teamOptions.push({
                            key: team.val().shortName,
                            value: team.val().name
                        })
                    });

                   this.updateFields(game, teamOptions, teams, type, gameId);
                })
        }

        if(!gameId) {
            getTeams(false, 'Add Game');
        } else {
            firebaseDB.ref(`games/${gameId}`)
                .once('value')
                .then(data => {
                    const game = data.val();
                    
                    getTeams(game, 'Edit Game');
                })
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
            formError: false,
            formData: newFormData
        })
    }

    successForm(message) {
        this.setState({
            formSuccess: message
        });

        setTimeout(() => this.setState({ formSuccess: '' }), 2000);
    }

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        this.state.teams.forEach(team => {
            if(team.shortName === dataToSubmit.local) {
                dataToSubmit['localThmb'] = team.thmb;
            }
            if(team.shortName === dataToSubmit.away) {
                dataToSubmit['awayThmb'] = team.thmb;
            }
        })

        if (formIsValid) {
            if(this.state.formType === 'Edit Game') { // edit game
                firebaseDB.ref(`games/${this.state.gameId}`)
                    .update(dataToSubmit).then(() => {
                        this.successForm('Update Completed')
                    }).catch(e => {
                        this.setState({ formError: true })
                    })
            } else { // add game
                firebaseGames.push(dataToSubmit).then(() => {
                    this.props.history.push('/admin_games');
                }).catch(e => {
                    this.setState({ formError: true })
                })
            }
        } else {
            this.setState({ formError: true })
        }
    }


    render() {
        return (
            <AdminLayout>
                <h2>{this.state.formType}</h2>

                <div className="editgame_wrapper">
                    <div>
                        <form onSubmit={(event) =>  this.submitForm(event)}>
                            <FormField
                                id={'date'}
                                formData={this.state.formData.date}
                                change={(element)=> this.updateForm(element)}
                            />

                            <div className="select_team_layout">
                                <div className="label_inputs">Home</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormField
                                            id={'local'}
                                            formData={this.state.formData.local}
                                            change={(element)=> this.updateForm(element)}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            id={'resultLocal'}
                                            formData={this.state.formData.resultLocal}
                                            change={(element)=> this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="select_team_layout">
                                <div className="label_inputs">Away</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormField
                                            id={'away'}
                                            formData={this.state.formData.away}
                                            change={(element)=> this.updateForm(element)}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            id={'resultAway'}
                                            formData={this.state.formData.resultAway}
                                            change={(element)=> this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="split_fields">                                
                                <FormField
                                    id={'arena'}
                                    formData={this.state.formData.arena}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </div>

                            <div className="split_fields">                                
                                <FormField
                                    id={'result'}
                                    formData={this.state.formData.result}
                                    change={(element)=> this.updateForm(element)}
                                />
                                <FormField
                                    id={'final'}
                                    formData={this.state.formData.final}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </div>

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
            </AdminLayout>
        );
    }
}

export default AddEditGame;