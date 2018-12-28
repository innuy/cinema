import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class OptionButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <button className="optionButtonContainer" onClick={this.props.onClick}>
                {this.props.text}
            </button>
        );
    }
}

OptionButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};


export default OptionButton;