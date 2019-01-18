import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import NavBar from "../../../components/GENERAL/NavBar";
import ReserveTicket from "../../../components/TICKETS/ReserveTicket";
import {getSinglePresentation} from "../../../API/presentations";
import {reserveTicket} from "../../../API/tickets";
import {navigateBack} from "../../../utils/navigation";


class ReserveTicketContainer extends Component {

    state = {
        presentationId: null,
        presentation: {
            rows: 7,
            columns: 7,
        }
    };

    history = null;

    constructor(props){
        super(props);

        this.getPresentationInfo = this.getPresentationInfo.bind(this);
        this.makeReservation = this.makeReservation.bind(this);
    }

    componentWillMount() {

        this.setState({
            presentationId: this.props.match.params.id,
        }, () => {
            this.getPresentationInfo();
        });
    }

    getPresentationInfo(){
        getSinglePresentation(this.state.presentationId, (presentation) => {
            /*this.setState({
               presentation
            });*/
        })
    }

    makeReservation(row, column){
        reserveTicket(this.state.presentationId, row, column, (success) => {
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
                            <NavBar isAdmin={false} history={this.history}/>
                            <ReserveTicket presentation={this.state.presentation} finalSelection={this.makeReservation}/>
                        </div>);
            }} />
        );
    }
}

export default ReserveTicketContainer;