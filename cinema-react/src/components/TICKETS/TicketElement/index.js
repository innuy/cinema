import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import cross from "../../../images/generic/cross.png";
import {parseTime} from "../../../utils/time";


class TicketElement extends Component {

    render() {

        return (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-11" onClick={() => {
                if (this.props.isAdmin) {
                    this.props.navigateToDetails(this.props.ticket.id);
                }
            }}>
                <div className="d-flex flex-column h-100 ticketElementContainer">
                    <div>
                        {this.props.isAdmin ?
                            <img alt={"Delete ticket"} className="ticketElementDelete" src={cross} onClick={(event) => {
                                event.stopPropagation();
                                this.props.deleteTicket(this.props.ticket.id)
                            }}/> : null}
                    </div>
                    <div className="ticketElementMainText">FILM: {this.props.ticket.film.name}</div>
                    <div className="ticketElementMainText">AUDITORIUM: {this.props.ticket.auditorium.number}</div>
                    <div
                        className="ticketElementSecondaryText">SEAT: {this.props.ticket.seat.row} - {this.props.ticket.seat.column}</div>
                    <div className="ticketElementSecondaryText">START
                        DATE: {parseTime(this.props.ticket.startTime)}</div>
                    <div className="ticketElementSecondaryText">WAS PAID: {this.props.ticket.sold ? "YES" : "NO"}</div>
                </div>
            </div>
        );
    }
}

TicketElement.propTypes = {
    ticket: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    deleteTicket: PropTypes.func,
    navigateToDetails: PropTypes.func
};


export default TicketElement;