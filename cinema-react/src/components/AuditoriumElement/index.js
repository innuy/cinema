import React, {Component} from 'react';
import PropTypes from 'prop-types';

import cross from '../../images/generic/cross.png';

import './styles.css';


class AuditoriumElement extends Component {

    render() {

        return (
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 auditoriumElementContainer">
                {this.props.isAdmin ? <img className="auditoriumElementDelete" src={cross} onClick={this.props.deleteAuditorium(this.props.id)}/> : null}
                <div className="auditoriumElementMainText">{this.props.auditorium.number}</div>
                <div className="auditoriumElementSecondaryText">ROWS: {this.props.auditorium.numberOfRows}</div>
                <div className="auditoriumElementSecondaryText">COLUMNS: {this.props.auditorium.numberOfColumns}</div>
            </div>
        );
    }
}

AuditoriumElement.propTypes = {
    auditorium: PropTypes.object.isRequired,
    deleteAuditorium: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
};


export default AuditoriumElement;