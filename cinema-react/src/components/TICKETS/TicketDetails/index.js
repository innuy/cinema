import React, {Component} from 'react';
import PropTypes from 'prop-types';

import OptionButton from "../../GENERAL/OptionButton";

import './styles.css';
import {USER_ROLES} from "../../../API/users";

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
        if (newProps.ticket) {

            this.setState({
                ticket: newProps.ticket,
            });
        }
    }

    updateInformation(index) {

        const ticket = this.state.ticket;

        let filmResult = this.props.films.find(obj => {
            return obj.id === this.props.presentations[index].film
        });
        if (filmResult) {
            ticket.film = filmResult;
        }

        let auditoriumResult = this.props.auditoriums.find(obj => {
            return obj.id === this.props.presentations[index].auditorium[0]._id
        });
        if (auditoriumResult) {
            ticket.auditorium = auditoriumResult;
        }

        ticket.startTime = new Date(this.props.presentations[index].startTime);
        ticket.startTime = ticket.startTime.toISOString().substring(0, 23);

        ticket.presentation = this.props.presentations[index].id;

        this.setState({
            ticket
        });
    }

    renderPresentations() {
        const res = [];

        if (this.props.films.length > 0) {
            for (let i = 0; i < this.props.presentations.length; i++) {
                let result = this.props.films.find(obj => {
                    return obj.id === this.props.presentations[i].film
                });
                if (result) {
                    res.push(<option key={"presentation_" + i}
                                     value={i}>{"Film: " + result.name + " - Auditorium:" + this.props.presentations[i].auditorium[0].number + " - At:" + this.props.presentations[i].startTime}</option>);
                }
            }
        }

        return res;
    }

    handlePaidChange() {
        const newTicket = this.state.ticket;
        newTicket.sold = !newTicket.sold;
        this.setState({
            ticket: newTicket,
        });
    }

    render() {

        let date = new Date(this.state.ticket.startTime);
        date = date.toISOString().substring(0, 23);

        return (
            <div className="justify-content-center">
                <div className="ticketDetailsSeparator"/>
                <div className="ticketDetailsSeparator"/>
                <form className="container ticketDetailsContainer">
                    <div className="ticketDetailsPageTitle">Ticket Information</div>
                    <div className="ticketDetailsSeparator"/>

                    <div className="input-group mb-3 form-group">
                        <select className="custom-select ticketDetailsSelect form-control" onChange={(data) => {
                            this.updateInformation(data.target.value);
                        }}>
                            {this.renderPresentations()}
                        </select>
                    </div>

                    <div className="ticketDetailsSeparator"/>

                    <div className="form-group">
                        <label className="ticketDetailsTitle">Film:</label>
                        <fieldset disabled>
                            <input className="ticketInput form-control" value={this.state.ticket.film.name}/>
                        </fieldset>
                    </div>

                    <div className="ticketDetailsSeparator"/>

                    <div className="form-group">
                        <label className="ticketDetailsTitle">Auditorium:</label>
                        <fieldset disabled>
                            <input className="ticketInput form-control" value={this.state.ticket.auditorium.number}/>
                        </fieldset>
                    </div>

                    <div className="ticketDetailsSeparator"/>

                    <fieldset disabled>
                        <input className="custom-select form-control ticketInput" type="datetime-local"
                               value={date} onChange={(event) => {
                            const ticket = this.state.ticket;
                            ticket.startTime = event.target.value;
                            this.setState({
                                ticket
                            });
                        }}/>
                    </fieldset>

                    <div className="ticketDetailsSeparator"/>

                    <div className="ticketDetailsTitle">Seat:</div>
                    <div
                        className="ticketInput">{"Row: " + this.state.ticket.seat.row + " - Column: " + this.state.ticket.seat.column}</div>

                    <div className="ticketDetailsSeparator"/>


                    <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="isAdminSwitch"
                               checked={this.state.ticket.sold}
                               onChange={this.handlePaidChange}/>
                        <label className="custom-control-label ticketDetailsTitle" htmlFor="isAdminSwitch">Has it been
                            paid?</label>
                    </div>


                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsSeparator"/>
                    <div className="ticketDetailsSeparator"/>
                    <OptionButton onClick={() => {
                        this.props.callback(this.state.ticket);
                    }} text={this.props.buttonText}/>
                    <div className="ticketDetailsSeparator"/>
                </form>
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