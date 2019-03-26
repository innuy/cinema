import React, {Component} from 'react';
import TicketDetails from "../../../components/TICKETS/TicketDetails";
import NavBar from "../../../components/GENERAL/NavBar";

import {editTicket, getSingleTicket} from "../../../API/tickets";
import {getPresentations} from "../../../API/presentations";
import {Route} from "react-router-dom";
import {navigateBack} from "../../../utils/navigation";
import {getFilms} from "../../../API/films";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";
import {getAuditoriums} from "../../../API/auditoriums";

class TicketDetailsContainer extends Component {

    history = null;

    state = {
        id: 0,
        ticket: {
            film: {},
            startTime: null,
            auditorium: {},
            seat: {}
        },
        presentations: [],
        films: [],
        auditoriums: [],

        errorVisible: false,
        errorCallback: null,
        errorText: "",
    };

    constructor(props) {
        super(props);

        this.editTicket = this.editTicket.bind(this);
        this.getAllInfo = this.getAllInfo.bind(this);
        this.hideError = this.hideError.bind(this);
    }

    componentWillMount() {

        this.setState({
            id: this.props.match.params.id,
        }, () => {
            this.getAllInfo();
        });

    }

    getAllInfo() {
        getSingleTicket(this.state.id, (success, data) => {
            if (success) {
                this.setState({
                    ticket: data,
                });
            } else {
                if (!this.state.errorVisible) {
                    this.setState({
                        errorVisible: true,
                        errorText: "There was an error obtaining ticket details",
                        errorCallback: this.getAllInfo,
                    });
                }
            }
        });

        getPresentations((success, data) => {
            if (success) {
                this.setState({
                    presentations: data
                });
            } else {
                if (!this.state.errorVisible && data) {
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.getAllInfo,
                    });
                }
            }
        });

        getFilms((success, data) => {
            if (success) {
                this.setState({
                    films: data
                });
            } else {
                if (!this.state.errorVisible) {
                    this.setState({
                        errorVisible: true,
                        errorText: "There was an error obtaining film details",
                        errorCallback: this.getAllInfo,
                    });
                }
            }
        });

        getAuditoriums((success, data) => {
            if (success) {
                this.setState({
                    auditoriums: data
                });
            } else {
                if (!this.state.errorVisible) {
                    this.setState({
                        errorVisible: true,
                        errorText: "There was an error obtaining auditorium details",
                        errorCallback: this.getAllInfo,
                    });
                }
            }
        });
    }

    editTicket(newTicket) {
        editTicket(newTicket, (success) => {
            if (success) {
                navigateBack(this.history);
            } else {
                if (!this.state.errorVisible) {
                    this.setState({
                        errorVisible: true,
                        errorText: "There was an error saving the ticket",
                        errorCallback: this.hideError,
                    });
                }
            }
        })
    }

    hideError() {
        this.setState({errorVisible: false});
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={true} history={this.history}/>
                    <TicketDetails presentations={this.state.presentations} ticket={this.state.ticket}
                                   films={this.state.films}
                                   auditoriums={this.state.auditoriums} callback={this.editTicket} buttonText={"EDIT"}/>
                    {this.state.errorVisible ?
                        <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                </div>);
            }}/>
        );
    }
}

export default TicketDetailsContainer;