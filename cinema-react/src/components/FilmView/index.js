import React, {Component} from 'react';
import PropTypes from 'prop-types';

import FilmElement from '../FilmElement';
import OptionButton from "../OptionButton";


import './styles.css';

class FilmView extends Component {

    constructor(props) {
        super(props);

        this.handleAddFilm = this.handleAddFilm.bind(this);
    }

    renderFilms(){
        const result = [];

        for(let i = 0; i < this.props.films.length; i++){
            result.push(<FilmElement key={"movie_"+i} film={this.props.films[i]} deleteFilm={this.props.deleteFilm} isAdmin={this.props.isAdmin}/>);
        }

        return result
    }

    handleAddFilm(){
        //TODO: SHOW DATA MODAL
    }

    render() {

        return (
            <div>
                <div className="row filmViewContainer justify-content-center">
                    {this.renderFilms()}
                </div>
                {this.props.isAdmin ? <div className="row col-lg-2 offset-lg-5 col-sm-4 offset-sm-4">
                    <OptionButton onClick={this.handleAddFilm} text={"Add Film"}/>
                </div> : null}
            </div>
        );
    }
}

FilmView.propTypes = {
    films: PropTypes.array.isRequired,
    addFilm: PropTypes.func.isRequired,
    deleteFilm: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
};

export default FilmView;