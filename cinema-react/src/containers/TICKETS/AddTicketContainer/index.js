import React, { Component } from 'react';
import TicketDetails from "../../../components/TICKETS/TicketDetails";
import NavBar from "../../../components/GENERAL/NavBar";

import {addTicket} from '../../../API/tickets';
import {Route} from "react-router-dom";
import {navigateBack} from "../../../utils/navigation";
import {getPresentations} from "../../../API/presentations";
import {getFilms} from "../../../API/films";
import {getAuditoriums} from "../../../API/auditoriums";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";

class AddTicketContainer extends Component {

    history = null;

    state = {
        id: 0,
        presentations: [],
        films: [],
        auditoriums: [],

        errorVisible: false,
        errorText: "",
        errorCallback: null,
    };

    constructor(props){
        super(props);

        this.addTicket = this.addTicket.bind(this);
        this.hideError = this.hideError.bind(this);
        this.obtainInfo = this.obtainInfo.bind(this);
    }

    componentWillMount() {

        this.setState({
            id: this.props.match.params.id,
        });

        this.obtainInfo();
    }

    obtainInfo(){
        getPresentations((success, data) => {
            if(success){
                this.setState({
                    presentations: data
                });
            }
            else{
                if(data){
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.obtainInfo,
                    });
                }
            }
        });

        getFilms((success, data) => {
            if(success){
                this.setState({
                    films: data
                });
            }
            else{
                if(data){
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.obtainInfo,
                    });
                }
            }
        });

        getAuditoriums((success, data) => {
            if(success){
                this.setState({
                    auditoriums: data
                });
            }
            else{
                if(data){
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.obtainInfo,
                    });
                }
            }
        });
    }

    addTicket(presentationId, userId){
        addTicket(presentationId, userId, (success, msg) => {
            if(success){
                navigateBack(this.history);
            }
            else{
                if(msg){
                    this.setState({
                        errorVisible: true,
                        errorText: msg,
                        errorCallback: this.hideError,
                    });
                }
            }
        });
    }

    hideError(){
        this.setState({errorVisible: false});
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                            <NavBar isAdmin={true} history={this.history}/>
                            <TicketDetails presentations={this.state.presentations} auditoriums={this.state.auditoriums}
                                           films={this.state.films} callback={this.addTicket} buttonText={"ADD"}/>
                            {this.state.errorVisible ? <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                        </div>);}} />
        );
    }
}

export default AddTicketContainer;