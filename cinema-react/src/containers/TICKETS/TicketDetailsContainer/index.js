import React, { Component } from 'react';
import TicketDetails from "../../../components/TICKETS/TicketDetails";
import NavBar from "../../../components/GENERAL/NavBar";

import {editTicket} from "../../../API/tickets";
import {getPresentations} from "../../../API/presentations";
import {Route} from "react-router-dom";
import {navigateBack} from "../../../utils/navigation";

class TicketDetailsContainer extends Component {

    history = null;

    state = {
        id: 0,
        ticket: {presentation: {startTime: null, film: {}, auditorium: {}}},
        presentations: [],
    };

    constructor(props){
        super(props);

        this.editTicket = this.editTicket.bind(this);
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
    }

    editTicket(newTicket){
        editTicket(newTicket, (success) => {
            //TODO: SHOW FEEDBACK
            if(success){
                navigateBack(this.history);
            }
            else{
                //TODO: HANDLE ERROR
            }
        })
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                            <NavBar isAdmin={true} history={this.history}/>
                            <TicketDetails presentations={this.state.presentations} ticket={this.state.ticket} callback={this.editTicket} buttonText={"EDIT"}/>
                        </div>);}} />
        );
    }
}

export default TicketDetailsContainer;