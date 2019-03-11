import React, {Component} from 'react';
import PropTypes from 'prop-types';

import cross from '../../../images/generic/cross.png';

import './styles.css';
import {parseTime} from "../../../utils/time";


class PresentationElement extends Component {

    render() {

        let filmName = "";
        let auditoriumNumber = "";

        for (let i = 0; i < this.props.films.length; i++) {
            if (this.props.films[i].id === this.props.presentation.film) {
                filmName = this.props.films[i].name
            }
        }

        for (let i = 0; i < this.props.auditoriums.length; i++) {
            if (this.props.auditoriums[i].id === this.props.presentation.auditoriumData.id) {
                auditoriumNumber = this.props.auditoriums[i].number
            }
        }

        return (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-11"
                onClick={() => {
                    if (this.props.isAdmin) {
                        this.props.navigateToDetails(this.props.presentation.id);
                    }
                }}>
                <div className="d-flex flex-column h-100 presentationElementContainer">
                    <div>
                        {this.props.isAdmin ?
                        <img alt={"Delete presentation"} className="presentationElementDelete" src={cross}
                             onClick={(event) => {
                                 event.stopPropagation();
                                 this.props.deletePresentation(this.props.presentation.id)
                             }}/> : null}
                    </div>
                    <div className="presentationElementMainText">FILM: {filmName}</div>
                    <div className="presentationElementMainText mt-auto">
                        <div className="presentationElementMainText ">AUDITORIUM: {auditoriumNumber}</div>
                        <div className="presentationElementSecondaryText ">START
                            TIME: {parseTime(this.props.presentation.startTime)}</div>
                        {this.props.isAdmin ? <div className="d-flex justify-content-between align-items-center"> <div
                            className="presentationElementSecondaryText ">SOLD </div>
                            <span className = "badge badge-light badge-pill"> {this.props.presentation.tickets} </span></div>: null}
                        {this.props.isAdmin ? null :
                            <div className="presentationElementButtonContainer">
                                <button onClick={() => {
                                    this.props.reserveTicket(this.props.presentation.id)
                                }}>Reserve a Ticket
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

PresentationElement.propTypes = {
    presentation: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    reserveTicket: PropTypes.func,
    deletePresentation: PropTypes.func,
    navigateToDetails: PropTypes.func,
    auditoriums: PropTypes.array.isRequired,
    films: PropTypes.array.isRequired,
};


export default PresentationElement;