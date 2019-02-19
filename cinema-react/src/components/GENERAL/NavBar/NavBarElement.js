import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class NavBarElement extends Component {

    render() {

        return (
            <button className="navBarElementContainer" onClick={() => {
                this.props.handleClick(this.props.redirection, this.props.extra);
            }}>
                {this.props.text}
            </button>
        );
    }
}

NavBarElement.propTypes = {
    text: PropTypes.string.isRequired,
    redirection: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    extra: PropTypes.func
};


export default NavBarElement;