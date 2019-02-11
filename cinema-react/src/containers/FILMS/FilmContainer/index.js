import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import FilmView from "../../../components/FILMS/FilmView";
import {getFilms, deleteFilm} from "../../../API/films";
import NavBar from "../../../components/GENERAL/NavBar";
import {navigate} from "../../../utils/navigation";


class FilmContainer extends Component {

    state = {
        films: [{},{},{}],
        isAdmin: true,
    };

    history = null;

    constructor(props){
        super(props);

        this.deleteFilm = this.deleteFilm.bind(this);
        this.refreshFilms = this.refreshFilms.bind(this);
        this.addFilm = this.addFilm.bind(this);
        this.navigateToDetails = this.navigateToDetails.bind(this);
    }

    componentWillMount() {
        this.refreshFilms();
    }

    refreshFilms(){
        getFilms((success, data) => {

            if(success) {
                this.setState({
                    films: data,
                });
            }
            else{
                /*TODO: HANDLE ERROR*/
            }
        });
    }

    addFilm(){
        navigate(this.history, '/addFilm');
    }

    navigateToDetails(id){
        navigate(this.history, 'film/'+id);
    }

    deleteFilm(id){
        deleteFilm(id, (success) => {
            if(success) {
                this.refreshFilms();
            }
            else{
                /* TODO: HANDLE ERROR */
            }
        })
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={this.state.isAdmin} history={this.history}/>
                    <FilmView films={this.state.films} addFilm={this.addFilm} deleteFilm={this.deleteFilm} navigateToDetails={this.navigateToDetails} isAdmin={this.state.isAdmin}/>
                </div>);
            }} />
        );
    }
}

export default FilmContainer;