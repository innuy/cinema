import React, {Component} from 'react';
import PropTypes from 'prop-types';

import OptionButton from "../../GENERAL/OptionButton";

import './styles.css';

class TicketDetails extends Component {

    state = {
        ticket: {
            film: {},
            startTime: null,
            auditorium: {},
            presentation: null,
            seat: {},
            sold: false,
        },
    };

    constructor(props) {
        super(props);

        this.updateInformation = this.updateInformation.bind(this);
        this.handlePaidChange = this.handlePaidChange.bind(this);
    }


    componentWillReceiveProps(newProps) {
        if(newProps.ticket){

            this.setState({
                ticket: newProps.ticket,
            });
        }
    }

    updateInformation(index){

        const ticket = this.state.ticket;

        let filmResult = this.props.films.find(obj => {
            return obj.id === this.props.presentations[index].film
        });
        if(filmResult) {
            ticket.film = filmResult;
        }

        let auditoriumResult = this.props.auditoriums.find(obj => {
            return obj.id === this.props.presentations[index].auditorium[0]._id
        });
        if(auditoriumResult) {
            ticket.auditorium = auditoriumResult;
        }

        ticket.startTime = this.props.presentations[index].startTime;
        ticket.presentation = this.props.presentations[index].id;

        this.setState({
            ticket
        });
    }

    renderPresentations(){
        const res = [];

        if(this.props.films.length > 0) {
            for (let i = 0; i < this.props.presentations.length; i++) {
                let result = this.props.films.find(obj => {
                    return obj.id === this.props.presentations[i].film
                });
                if(result) {
                    res.push(<option key={"presentation_" + i}
                                     value={i}>{"Film: " + result.name + " - Auditorium:" + this.props.presentations[i].auditorium[0].number + " - At:" + this.props.presentations[i].startTime}</option>);
                }
            }
        }

        return res;
    }

    handlePaidChange(){
        const newTicket = this.state.ticket;
        newTicket.sold = !newTicket.sold;
        this.setState({
            ticket: newTicket,
        });
    }

    render() {

        return (
            <div>
                <div className="ticketDetailsSeparator"/>
                <div className="ticketDetailsSeparator"/>
                <div className="ticketDetailsContainer">
                    <div className="ticketDetailsPageTitle">TICKET INFORMATION</div>
                    <div className="ticketDetailsSeparator"/>
                    <select className="ticketDetailsSelect" onChange={(data) => {
                        this.updateInformation(data.target.value);
                    }}>
                        {this.renderPresentations()}
                    </select>
                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsTitle">Film:</div>
                    <div className="ticketInput">{this.state.ticket.film.name}</div>
                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsTitle">Auditorium:</div>
                    <div className="ticketInput">{this.state.ticket.auditorium.number}</div>
                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsTitle">Start time:</div>
                    <div className="ticketInput">{this.state.ticket.startTime}</div>
                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsTitle">Seat:</div>
                    <div className="ticketInput">{"Row: " + this.state.ticket.seat.row + " - Column: " + this.state.ticket.seat.column}</div>
                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsTitle">Has it been paid?</div>
                    <input className="ticketInput" type="checkbox" checked={this.state.ticket.sold} onChange={this.handlePaidChange}/>
                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsSeparator"/>
                    <OptionButton onClick={() => {
                        //TODO: CHECK ALL DATA IS PRESENT
                        this.props.callback(this.state.ticket);
                    }} text={this.props.buttonText}/>
                    <div className="ticketDetailsSeparator"/>
                </div>
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
    films: PropTypes.array.isRequired,
    auditoriums: PropTypes.array.isRequired,
};

export default TicketDetails;