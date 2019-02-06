import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import NavBar from "../../../components/GENERAL/NavBar";
import ReserveTicket from "../../../components/TICKETS/ReserveTicket";
import {getSinglePresentation} from "../../../API/presentations";
import {getTicketsOfPresentation, reserveTicket} from "../../../API/tickets";
import {navigateBack} from "../../../utils/navigation";
import {getSingleAuditorium} from "../../../API/auditoriums";


class ReserveTicketContainer extends Component {

    state = {
        tickets: [],
        auditorium: {
            rows: 0,
            columns: 0
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
        getTicketsOfPresentation(this.state.presentationId, (success, tickets) => {
            if(success) {
                if(tickets.length > 0) {
                    this.setState({
                        tickets,
                        auditorium: tickets[0].auditorium,
                    });
                }
                else{
                    getSinglePresentation(this.state.presentationId, (success, data) => {
                        if(success){
                            this.setState({
                               auditorium: data.auditoriumData,
                            });
                        }
                        else{
                            //TODO: HANDLE ERROR
                        }
                    });
                }
            }
            else{
                //TODO: HANDLE ERROR
            }
        });


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
                            <ReserveTicket tickets={this.state.tickets} auditorium={this.state.auditorium} finalSelection={this.makeReservation}/>
                        </div>);
            }} />
        );
    }
}

export default ReserveTicketContainer;