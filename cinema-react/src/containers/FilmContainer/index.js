import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import FilmView from "../../components/FilmView";
import {getFilms, deleteFilm} from "../../API/films";
import NavBar from "../../components/NavBar";


class FilmContainer extends Component {

    state = {
        films: [{},{},{}],
        isAdmin: false,
    };

    history = null;

    constructor(props){
        super(props);

        this.deleteFilm = this.deleteFilm.bind(this);
        this.refreshFilms = this.refreshFilms.bind(this);
    }

    componentWillMount() {
        this.refreshFilms();
    }

    refreshFilms(){
        getFilms((success, data) => {
            /*TODO: HANDLE ERROR*/
            this.setState({
                films: data,
            });
        });
    }

    deleteFilm(id){
        deleteFilm(id, () => {
            this.refreshFilms();

            /* TODO: HANDLE ERROR */
        })
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={this.state.isAdmin} history={this.history}/>
                    <FilmView films={this.state.films} deleteFilm={this.deleteFilm} isAdmin={this.state.isAdmin}/>
                </div>);
            }} />
        );
    }
}

export default FilmContainer;