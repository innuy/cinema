import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import {parseTime} from "../../../utils/time";

class ConfirmReservation extends Component {


    state = {
        filteredMovie: "",
        filteredAuditorium: 0,
        filteredRow: null,
        filteredColumn: null,
    };

    constructor(props) {
        super(props);

        this.renderData = this.renderData.bind(this);
        this.shouldShowTicket = this.shouldShowTicket.bind(this);
    }


    renderData() {
        const res = [];

        for (let i = 0; i < this.props.tickets.length; i++) {

            if (this.shouldShowTicket(this.props.tickets[i])) {
                res.push(<tr onClick={this.props.confirmTicket}>
                    <td className="reservationTableField">{this.props.tickets[i].film.name}</td>
                    <td className="reservationTableField">{this.props.tickets[i].auditorium.number}</td>
                    <td className="reservationTableField">{this.props.tickets[i].seat.row + " - " + this.props.tickets[i].seat.column}</td>
                    <td className="reservationTableField">{parseTime(this.props.tickets[i].startTime)}</td>
                </tr>)
            }
        }

        return res;
    }

    shouldShowTicket(ticket) {

        if ( //Ticket was not already sold
            (!ticket.sold) &&
            //Filter with name of movie
            (ticket.film.name.startsWith(this.state.filteredMovie) || !this.state.filteredMovie) &&
            //Filter with auditorium number
            (this.state.filteredAuditorium <= 0 || ticket.auditorium.number === parseInt(this.state.filteredAuditorium)) &&
            //Filter with seat row
            (!this.state.filteredRow || ticket.seat.row === parseInt(this.state.filteredRow)) &&
            //Filter with seat column
            (!this.state.filteredColumn || ticket.seat.column === parseInt(this.state.filteredColumn))) {
            return true;
        }
        return false;
    }

    render() {

        return (
            <div>
                <div className="reservationInputTitle">MOVIE FILTER</div>
                <input className="reservationInput" value={this.state.filteredMovie} onChange={(event) => {
                    this.setState({
                        filteredMovie: event.target.value
                    });
                }}/>
                <div className="reservationInputTitle">AUDITORIUM FILTER</div>
                <input className="reservationInput" type="number" value={this.state.filteredAuditorium}
                       onChange={(event) => {
                           if (event.target.value >= 0) {
                               this.setState({
                                   filteredAuditorium: event.target.value
                               });
                           }
                       }}/>
                <div className="reservationInputTitle">ROW FILTER</div>
                <input className="reservationInput" type="number" value={this.state.filteredRow} onChange={(event) => {
                    if (event.target.value >= 0) {
                        this.setState({
                            filteredRow: event.target.value
                        });
                    }
                }}/>
                <div className="reservationInputTitle">COLUMN FILTER</div>
                <input className="reservationInput" type="number" value={this.state.filteredColumn}
                       onChange={(event) => {
                           if (event.target.value >= 0) {
                               this.setState({
                                   filteredColumn: event.target.value
                               });
                           }
                       }}/>

                <table className="reservationTable">
                    <tr>
                        <th className="reservationTableHeader">Movie</th>
                        <th className="reservationTableHeader">Auditorium</th>
                        <th className="reservationTableHeader">Seat</th>
                        <th className="reservationTableHeader">Start Time</th>
                    </tr>

                    {this.renderData()}
                </table>
                <div className="reservationSeparator"/>
            </div>
        );
    }
}

ConfirmReservation.propTypes = {
    tickets: PropTypes.array.isRequired,
    confirmTicket: PropTypes.func.isRequired,
};

export default ConfirmReservation;