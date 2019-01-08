import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class Index extends Component {


    render() {
        return (
            <div className="filmDetailsCastElementContainer">
                <input className="filmInput" value={this.props.text} onChange={(event) => {
                    this.props.editCallback(this.props.index, event.target.value)
                }}/>
            </div>
        );
    }
}

Index.propTypes = {
    text: PropTypes.string.isRequired,
    editCallback: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

export default Index;