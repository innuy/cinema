import React, {Component} from 'react';
import PropTypes from 'prop-types';

import cross from '../../../images/generic/cross.png';
import placeholder from '../../../images/generic/filmPlaceholder.png';

import './styles.css';


class FilmElement extends Component {

    parseCast(cast) {
        if (cast && cast.length && cast.length > 0) {
            let res = cast[0];

            for (let i = 1; i < cast.length; i++) {
                res = res + "; " + cast[i];
            }

            return res;
        } else {
            return "";
        }
    }

    render() {

        return (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-11">
                <div  className="filmElementContainer d-flex flex-column h-100 card"
                     onClick={() => {
                         if (!!this.props.navigateToDetails) {
                             this.props.navigateToDetails(this.props.film.id);
                         }
                     }}>
                    <div className="d-flex flex-column h-100 filmElementBody">
                        <div className="card-body">
                            {this.props.isAdmin ?
                                <img alt={"Delete ticket"} className="filmElementDelete" src={cross}
                                     onClick={(event) => {
                                         event.stopPropagation();
                                         this.props.deleteTicket(this.props.ticket.id)
                                     }}/> : null}
                            <div className="filmElementMainText card-title">{this.props.film.name}</div>
                        </div>
                        <img className="filmElementImage card-img-top"
                             src={this.props.film.image ? this.props.film.image : placeholder}
                             alt={this.props.film.name}/>
                        <div className=" filmElementBody">

                            <div className="card-body">
                                {/*<div className="filmElementSecondaryText card-text">{this.props.film.summary}</div>*/}
                                <div
                                    className="filmElementSecondaryText card-text">DURATION: {this.props.film.duration}</div>
                                <div
                                    className="filmElementSecondaryText card-text">DIRECTOR: {this.props.film.director}</div>
                                <div
                                    className="filmElementSecondaryText card-text">CAST: {this.parseCast(this.props.film.cast)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

FilmElement.propTypes = {
    film: PropTypes.object.isRequired,
    deleteFilm: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    navigateToDetails: PropTypes.func
};


export default FilmElement;