import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import FilmView from "../../components/FilmView";
import {getFilms, addFilm} from "../../API/films";
import NavBar from "../../components/NavBar";


class FilmContainer extends Component {

    state = {
        films: [{},{},{}],
        isAdmin: false,
    };

    history = null;

    constructor(props){
        super(props);

        this.addFilm = this.addFilm.bind(this);
        this.deleteFilm = this.deleteFilm.bind(this);
    }

    componentWillMount() {
        getFilms((success, data) => {
            console.log(JSON.stringify(data));
            this.setState({
                films: data,
            });
        });
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
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={this.state.isAdmin} history={this.history}/>
                    <FilmView films={this.state.films} addFilm={this.addFilm} deleteFilm={this.deleteFilm} isAdmin={this.state.isAdmin}/>
                </div>);
            }} />
        );
    }
}

export default FilmContainer;