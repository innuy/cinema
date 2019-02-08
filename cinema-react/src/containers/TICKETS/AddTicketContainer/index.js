import React, { Component } from 'react';
import TicketDetails from "../../../components/TICKETS/TicketDetails";
import NavBar from "../../../components/GENERAL/NavBar";

import {addTicket} from '../../../API/tickets';
import {Route} from "react-router-dom";
import {navigateBack} from "../../../utils/navigation";
import {getPresentations} from "../../../API/presentations";
import {getFilms} from "../../../API/films";
import {getAuditoriums} from "../../../API/auditoriums";

class AddTicketContainer extends Component {

    history = null;

    state = {
        id: 0,
        presentations: [],
        films: [],
        auditoriums: [],
    };

    constructor(props){
        super(props);

        this.addTicket = this.addTicket.bind(this);
    }

    componentWillMount() {

        this.setState({
            id: this.props.match.params.id,
        });

        getPresentations((success, data) => {
            if(success){
                this.setState({
                    presentations: data
                });
            }
            else{
                //TODO: HANDLE ERROR
            }
        });

        getFilms((success, data) => {
            if(success){
                this.setState({
                    films: data
                });
            }
            else{
                //TODO: HANDLE ERROR
            }
        });

        getAuditoriums((success, data) => {
            if(success){
                this.setState({
                    auditoriums: data
                });
            }
            else{
                //TODO: HANDLE ERROR
            }
        });
    }

    addTicket(presentationId, userId){
        addTicket(presentationId, userId, (success) => {
            //TODO: SHOW FEEDBACK
            if(success){
                navigateBack(this.history);
            }
            else{
                //TODO: HANDLE ERROR
            }
        });
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                            <NavBar isAdmin={true} history={this.history}/>
                            <TicketDetails presentations={this.state.presentations} auditoriums={this.state.auditoriums}
                                           films={this.state.films} callback={this.addTicket} buttonText={"ADD"}/>
                        </div>);}} />
        );
    }
}

export default AddTicketContainer;