import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TicketElement from '../TicketElement';

import './styles.css';

class MyTickets extends Component {

    constructor(props){
        super(props);

        this.renderTickets = this.renderTickets.bind(this);
    }

    renderTickets(){
        const result = [];

        for(let i = 0; i < this.props.tickets.length; i++){
            result.push(<TicketElement key={"ticket_"+i} film={this.props.tickets[i]}/>);
        }

        return result
    }

    render() {

        return (
            <div>
                <div className="ticketViewTitle">Your Tickets</div>
                <div className="row ticketViewContainer justify-content-center">
                    {this.renderTickets()}
                </div>
            </div>
        );
    }
}

MyTickets.propTypes = {
    tickets: PropTypes.array.isRequired,
};

export default MyTickets;