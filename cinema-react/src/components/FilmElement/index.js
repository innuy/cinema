import React, {Component} from 'react';
import PropTypes from 'prop-types';

import cross from '../../images/generic/cross.png';
import placeholder from '../../images/generic/filmPlaceholder.png';

import './styles.css';


class FilmElement extends Component {

    parseCast(cast){
        if(cast && cast.length && cast.length > 0) {
            let res = cast[0];

            for(let i = 1; i < cast.length; i++){
                res = res + "; " + res[i];
            }

            return res;
        }
        else{
            return "";
        }

    }

    render() {

        return (
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 filmElementContainer">
                {this.props.isAdmin ? <img className="filmElementDelete" src={cross} alt="Delete" onClick={this.props.deleteFilm(this.props.id)}/> : null}
                <div className="filmElementMainText">{this.props.film.name}</div>
                <img className="filmElementImage" src={this.props.film.image ? this.props.film.image : placeholder} alt={this.props.film.name}/>
                <div className="filmElementSecondaryText">{this.props.film.summary}</div>
                <div className="filmElementSecondaryText">DURATION: {this.props.film.duration}</div>
                <div className="filmElementSecondaryText">DIRECTOR: {this.props.film.director}</div>
                <div className="filmElementSecondaryText">CAST: {this.parseCast(this.props.film.cast)}</div>
            </div>
        );
    }
}

FilmElement.propTypes = {
    film: PropTypes.object.isRequired,
    deleteFilm: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
};


export default FilmElement;