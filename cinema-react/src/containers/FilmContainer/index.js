import React, { Component } from 'react';
import FilmView from "../../components/FilmView";
import {getFilms, addFilm} from "../../API/films";


class FilmContainer extends Component {

    state = {
        films: [{},{},{}],
        isAdmin: false,
    };

    constructor(props){
        super(props);

        this.addFilm = this.addFilm.bind(this);
        this.deleteFilm = this.deleteFilm.bind(this);
    }

    componentWillMount() {
        /*getFilms((success, data) => {
            this.setState({
                films: data,
            });
        });*/
    }

    addFilm(){
        /*

         */
    }

    deleteFilm(id){
        /*

         */
    }

    render() {
        return (
            <FilmView films={this.state.films} addFilm={this.addFilm} deleteFilm={this.deleteFilm} isAdming={this.state.isAdmin}/>
        );
    }
}

export default FilmContainer;