import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import NavBar from "../../../components/GENERAL/NavBar";
import ReserveTicket from "../../../components/TICKETS/ReserveTicket";
import {getSinglePresentation} from "../../../API/presentations";
import {reserveTicket} from "../../../API/tickets";
import {navigateBack} from "../../../utils/navigation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";
import {setReservingTicketsSocket} from "../../../API/socket";


class ReserveTicketContainer extends Component {

    state = {
        tickets: [],
        auditorium: {
            rows: 0,
            columns: 0
        },

        errorVisible: false,
        errorText: "",
        errorCallback: null,
    };

    history = null;

    constructor(props){
        super(props);

        this.getPresentationInfo = this.getPresentationInfo.bind(this);
        this.makeReservation = this.makeReservation.bind(this);
        this.hideError = this.hideError.bind(this);
    }

    componentWillMount() {

        this.setState({
            presentationId: this.props.match.params.id,
        }, () => {
            this.getPresentationInfo();
        });
    }

    getPresentationInfo(){
        this.hideError();
        setReservingTicketsSocket(this.state.presentationId, (success, ticketsData) => {
        // getTicketsOfPresentation(this.state.presentationId, (success, ticketsData) => {
            if(success) {
                if(ticketsData.length > 0) {
                    this.setState({
                        tickets: ticketsData,
                        auditorium: ticketsData[0].auditorium,
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
                            this.setState({
                                errorVisible: true,
                                errorText: data,
                                errorCallback: this.getPresentationInfo,
                            });
                        }
                    });
                }
            }
            else{
                this.setState({
                    errorVisible: true,
                    errorText: ticketsData,
                    errorCallback: this.getPresentationInfo,
                });
            }
        });


    }

    makeReservation(row, column){
        reserveTicket(this.state.presentationId, row, column, (success, errorMsg) => {
            if(success){
                navigateBack(this.history);
            }
            else{
                this.setState({
                    errorVisible: true,
                    errorText: errorMsg,
                    errorCallback: this.hideError,
                });
            }
        })
    }

    hideError(){
        this.setState({errorVisible: false});
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                            <NavBar isAdmin={false} history={this.history}/>
                            <ReserveTicket tickets={this.state.tickets} auditorium={this.state.auditorium} finalSelection={this.makeReservation}/>
                            {this.state.errorVisible ? <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                        </div>);
            }} />
        );
    }
}

export default ReserveTicketContainer;