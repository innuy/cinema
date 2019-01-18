import React, {Component} from 'react';
import PropTypes from 'prop-types';

import OptionButton from "../../GENERAL/OptionButton";

import './styles.css';

class TicketDetails extends Component {


    state = {
        ticket: {
            presentation: {
                film: null,
                startTime: null,
                auditorium: null
            }
        },
    };

    constructor(props) {
        super(props);

        this.updateInformation = this.updateInformation.bind(this);
    }


    componentWillReceiveProps() {
        if(this.props.ticket){
            this.setState({
                ticket: this.props.ticket,
            })
        }
    }

    updateInformation(index){

        const ticket = this.state.ticket;
        ticket.presentation = this.props.presentations[index];

        this.setState({
            ticket
        });
    }

    renderPresentations(){
        const res = [];

        for(let i = 0; i < this.props.presentations; i++){
            res.push(<option value={this.props.presentations[i]._id}>{this.props.presentations[i].film.name - this.props.presentations[i].auditorium.name - this.props.presentations[i].startTime}</option>);
        }

        return res;
    }

    render() {
        return (
            <div>
                <div className="ticketDetailsSeparator"/>
                <div className="ticketDetailsSeparator"/>
                <div className="ticketDetailsContainer">
                    <div className="ticketDetailsPageTitle">TICKET INFORMATION</div>
                    <div className="ticketDetailsSeparator"/>
                    <select onChange={(data) => {
                        this.updateInformation(data.target.value);
                    }}>
                        {this.renderPresentations()}
                    </select>
                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsTitle">Film:</div>
                    <div className="ticketInput">{this.state.ticket.presentation.film.name}</div>
                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsTitle">Auditorium:</div>
                    <div className="ticketInput">{this.state.ticket.presentation.auditorium.name}</div>
                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsTitle">Start time:</div>
                    <div className="ticketInput">{this.state.ticket.presentation.startTime}</div>
                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsSeparator"/>
                    <OptionButton onClick={() => {
                        //TODO: CHECK ALL DATA IS PRESENT
                        this.props.callback(this.state.ticket);
                    }} text={this.props.buttonText}/>
                </div>
                <div className="ticketDetailsSeparator"/>
                <div className="ticketDetailsSeparator"/>
            </div>
        );
    }
}

TicketDetails.propTypes = {
    ticket: PropTypes.object,
    callback: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    presentations: PropTypes.array.isRequired,
};

export default TicketDetails;