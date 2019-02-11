import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import cross from '../../../images/generic/cross.png';

class Index extends Component {


    render() {
        return (
            <div className="filmDetailsCastElementContainer">
                <img className="filmCastDelete" src={cross} alt={"delete"} onClick={(event) => {
                    event.stopPropagation();
                    this.props.deleteCallback(this.props.index);
                }}/>
                <input className="filmCastInput" value={this.props.text} onChange={(event) => {
                    this.props.editCallback(this.props.index, event.target.value)
                }}/>
            </div>
        );
    }
}

Index.propTypes = {
    text: PropTypes.string.isRequired,
    editCallback: PropTypes.func.isRequired,
    deleteCallback: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

export default Index;