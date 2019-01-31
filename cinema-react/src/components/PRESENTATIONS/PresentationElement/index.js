import React, {Component} from 'react';
import PropTypes from 'prop-types';

import cross from '../../../images/generic/cross.png';

import './styles.css';


class PresentationElement extends Component {

    render() {

        return (
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 presentationElementContainer" onClick={() => {
                if(this.props.isAdmin){
                    this.props.navigateToDetails(this.props.presentation.id);
                }
            }}>
                {this.props.isAdmin ? <img alt={"Delete presentation"} className="presentationElementDelete" src={cross} onClick={(event) => {event.stopPropagation(); this.props.deletePresentation(this.props.presentation.id)}}/> : null}
                <div className="presentationElementMainText">FILM: {this.props.presentation.film.name}</div>
                <div className="presentationElementMainText">AUDITORIUM: {this.props.presentation.auditorium.number}</div>
                <div className="presentationElementSecondaryText">START TIME: {this.props.presentation.startTime}</div>
                <div className="presentationElementSecondaryText">TICKETS: {this.props.presentation.tickets}</div>
                {this.props.isAdmin ? null : <button onClick={() => {this.props.reserveTicket(this.props.presentation.id)}}>Reserve a Ticket</button>}
            </div>
        );
    }
}

PresentationElement.propTypes = {
    presentation: PropTypes.object.isRequired,
    reserveTicket: PropTypes.func,
    deletePresentation: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    navigateToDetails: PropTypes.func,
};


export default PresentationElement;