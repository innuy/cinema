import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class OptionButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="optionButtonContainer">
                <button className="optionButtonInner" onClick={this.props.onClick}>
                    {this.props.text}
                </button>
            </div>
        );
    }
}

OptionButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};


export default OptionButton;