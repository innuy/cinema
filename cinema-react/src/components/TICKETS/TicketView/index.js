import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TicketElement from '../TicketElement';
import OptionButton from "../../GENERAL/OptionButton";

import './styles.css';

class TicketView extends Component {

    renderTickets(){
        const result = [];

        for(let i = 0; i < this.props.tickets.length; i++){
            result.push(<TicketElement key={"ticket_"+i} ticket={this.props.tickets[i]} deleteTicket={this.props.deleteTicket} isAdmin={this.props.isAdmin}/>);
        }

        return result
    }


    render() {

        return (
            <div>
                <div className="ticketViewTitle">All Tickets</div>
                <div className="row ticketViewContainer justify-content-center">
                    {this.renderTickets()}
                </div>
                {this.props.isAdmin ? <div className="row col-lg-2 offset-lg-5 col-sm-4 offset-sm-4">
                    <OptionButton onClick={this.props.addTicket} text={"Add Ticket"}/>
                </div> : null}
            </div>
        );
    }
}

TicketView.propTypes = {
    tickets: PropTypes.array.isRequired,
    addTicket: PropTypes.func,
    deleteTicket: PropTypes.func,
    isAdmin: PropTypes.bool.isRequired,
};

export default TicketView;