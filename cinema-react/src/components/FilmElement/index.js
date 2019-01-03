import React, {Component} from 'react';
import PropTypes from 'prop-types';

import cross from '../../images/generic/cross.png';

import './styles.css';


class FilmElement extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 filmElementContainer">
                {this.props.isAdmin ? <img className="filmElementDelete" src={cross} onClick={this.props.deleteFilm(this.props.id)}/> : null}
                <div className="filmElementMainText">{this.props.film.name}</div>
                <div className="filmElementSecondaryText">{this.props.film.genre}</div>
                <div className="filmElementSecondaryText">DURATION: {this.props.film.duration} hs</div>
                <div className="filmElementSecondaryText">DIRECTOR: {this.props.film.director}</div>
                <div className="filmElementSecondaryText">CAST: {this.props.film.cast}</div>
                <img src={this.props.film.image} alt={this.props.film.name}/>
            </div>
        );
    }
}

FilmElement.propTypes = {
    film: PropTypes.object.isRequired,
    deleteFilm: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired
};


export default FilmElement;