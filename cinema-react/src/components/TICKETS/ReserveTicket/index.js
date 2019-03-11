import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import SeatElement from "../SeatElement";


class ReserveTicket extends Component {


    state = {
        row: null,
        column: null,
    };

    constructor(props) {
        super(props);

        this.renderSeats = this.renderSeats.bind(this);
        this.selectionCallback = this.selectionCallback.bind(this);
    }


    renderSeats() {

        const res = [];

        let selected = false;
        let taken = false;

        let seats = [];

        for (let i = 0; i < this.props.tickets; i++) {
            seats.push({
                row: this.props.tickets[i].row,
                column: this.props.tickets[i].column,
            });
        }

        for (let i = 0; i < this.props.auditorium.numberOfRows; i++) {
            let row = [];
            for (let j = 0; j < this.props.auditorium.numberOfColumns; j++) {
                selected = false;
                taken = false;
                if (this.state.row === i && this.state.column === j) {
                    selected = true;
                }

                for (let k = 0; k < this.props.tickets.length; k++) {
                    if (i + 1 === this.props.tickets[k].seat.row && j + 1 === this.props.tickets[k].seat.column) {
                        taken = true;
                    }
                }

                row.push(<SeatElement key={'seat_' + i + '_' + j} row={i} column={j} taken={taken}
                                      selectionCallback={this.selectionCallback} selected={selected}/>)
            }
            res.push(<div className="row rowFullWidth reserveTicketSeatRow" key={'seat_row_' + i}>{row}</div>);
        }

        return res;
    }

    selectionCallback(row, column) {
        this.setState({
            row,
            column
        });
    }

    render() {
        return (
            <div>
                <div className="container align-items-center">
                    <div
                        className="reserveTicketSeatContainer col-xs-12 col-sm-6 offset-sm-3 col-md-8 offset-md-2 col-lg-8 offset-lg-2 /*col-xl-4 offset-xl-4*/">
                        {this.renderSeats()}
                    </div>
                </div>
                <div className="row rowFullWidth reserveTicketButtonContainer">
                    <button className="reserveTicketButton" onClick={() => {
                        this.props.finalSelection(this.state.row + 1, this.state.column + 1)
                    }}>Confirm
                    </button>
                </div>
            </div>
        );
    }
}

ReserveTicket.propTypes = {
    tickets: PropTypes.array.isRequired,
    auditorium: PropTypes.object.isRequired,
    finalSelection: PropTypes.func.isRequired,
};

export default ReserveTicket;