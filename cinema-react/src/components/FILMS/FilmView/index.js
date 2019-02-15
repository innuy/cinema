import React, {Component} from 'react';
import PropTypes from 'prop-types';

import FilmElement from '../FilmElement';
import OptionButton from "../../GENERAL/OptionButton";


import './styles.css';

class FilmView extends Component {

    constructor(props){
        super(props);

        this.renderFilms = this.renderFilms.bind(this);
    }

    renderFilms(){
        const result = [];

        for(let i = 0; i < this.props.films.length; i++){
            result.push(<FilmElement key={"movie_"+i} film={this.props.films[i]} deleteFilm={this.props.deleteFilm}
                                     navigateToDetails={this.props.navigateToDetails} isAdmin={this.props.isAdmin}/>);
        }

        return result
    }

    render() {

        return (
            <div>
                <div className="filmViewTitle">All Films</div>
                <div className="row filmViewContainer justify-content-center">
                    {this.renderFilms()}
                </div>
                {this.props.isAdmin ? <div className="row col-lg-2 offset-lg-5 col-sm-4 offset-sm-4">
                    <OptionButton onClick={this.props.addFilm} text={"Add Film"}/>
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
    navigateToDetails: PropTypes.func.isRequired,
};

export default FilmView;