import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class ErrorAlert extends Component {

    render() {

        return (
            <div className="col-12 errorAlertContainer">
                <div className="col-6 offset-3 errorAlertInnerContainer">
                    <div className="errorAlertText">{this.props.text}</div>
                    <button className="errorAlertButton" onClick={this.props.callback}>Ok</button>
                </div>
            </div>
        );
    }
}


ErrorAlert.propTypes = {
    callback: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};


export default ErrorAlert;