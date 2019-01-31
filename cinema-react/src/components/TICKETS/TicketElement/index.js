import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import cross from "../../../images/generic/cross.png";


class TicketElement extends Component {

    render() {

        return (
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 ticketElementContainer" onClick={() => {
                if(this.props.isAdmin) {
                    this.props.navigateToDetails(this.props.ticket.id);
                }
            }}>
                {this.props.isAdmin ? <img className="ticketElementDelete" alt={"Delete ticket"} src={cross} onClick={(event) => {event.stopPropagation(); this.props.deleteTicket(this.props.ticket.id)}}/> : null}
                <div className="ticketElementSecondaryText">FILM: {this.props.ticket.film.name}</div>
                <div className="ticketElementSecondaryText">AUDITORIUM: {this.props.ticket.auditorium.number}</div>
                <div className="ticketElementSecondaryText">START DATE: {this.props.ticket.startTime}</div>
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