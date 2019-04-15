import React, {Component} from 'react';
import PropTypes from 'prop-types';

import cross from '../../../images/generic/cross.png';

import './styles.css';


class AuditoriumElement extends Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
        event.stopPropagation();
        this.props.deleteAuditorium(this.props.auditorium.id);
    }

    render() {

        return (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-11" onClick={() => {
                this.props.navigateToDetails(this.props.auditorium.id);
            }}>
                <div className="d-flex flex-column h-100 auditoriumElementContainer">
                    <div>
                        {this.props.isAdmin ?
                            <img alt={"Delete auditorium"} className="auditoriumElementDelete" src={cross}
                                 onClick={this.handleDelete}/> : null}
                    </div>
                    <div className="auditoriumElementMainText">{this.props.auditorium.number}</div>
                    <div className="auditoriumElementSecondaryText">ROWS: {this.props.auditorium.numberOfRows}</div>
                    <div
                        className="auditoriumElementSecondaryText">COLUMNS: {this.props.auditorium.numberOfColumns}
                    </div>
                </div>
            </div>
        );
    }
}

AuditoriumElement.propTypes = {
    auditorium: PropTypes.object.isRequired,
    deleteAuditorium: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    navigateToDetails: PropTypes.func.isRequired,
};


export default AuditoriumElement;