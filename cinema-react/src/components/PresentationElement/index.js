import React, {Component} from 'react';
import PropTypes from 'prop-types';

import cross from '../../images/generic/cross.png';

import './styles.css';


class PresentationElement extends Component {

    render() {


        return (
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 presentationElementContainer">
                {this.props.isAdmin ? <img className="presentationElementDelete" src={cross} onClick={this.props.deletePresentation(this.props.id)}/> : null}
                <div className="presentationElementMainText">{this.props.presentation.film}. AUDITORIUM: {this.props.presentation.auditorium}</div>
                <div className="presentationElementSecondaryText">START TIME: {this.props.presentation.startTime}</div>
                <div className="presentationElementSecondaryText">TICKETS: {this.props.presentation.tickets}</div>
            </div>
        );
    }
}

PresentationElement.propTypes = {
    presentation: PropTypes.object.isRequired,
    deletePresentation: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
};


export default PresentationElement;