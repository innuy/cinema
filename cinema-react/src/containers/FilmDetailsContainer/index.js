import React, { Component } from 'react';
import FilmDetails from "../../components/FilmDetails";


class FilmDetailsContainer extends Component {

    state = {
        id: 0,
        film: {}
    };

    constructor(props){
        super(props);

        this.editFilm = this.editFilm.bind(this);
    }

    componentWillMount() {

        this.setState({
            id: this.props.match.params.id,
        });

        /* TODO: GET FILM BY ID */
    }

    editFilm(newFilm){
        /*
            TODO: UPLOAD NEW FILM
         */
    }


    render(match) {
        return (
            <FilmDetails film={this.state.film} callback={this.editFilm}/>
        );
    }
}

export default FilmDetailsContainer;