import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import FilmView from "../../../components/FILMS/FilmView";
import {getFilms, deleteFilm} from "../../../API/films";
import NavBar from "../../../components/GENERAL/NavBar";
import {navigate} from "../../../utils/navigation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";


class FilmContainer extends Component {

    state = {
        films: [{},{},{}],
        isAdmin: true,

        errorVisible: false,
        errorText: "",
        errorCallback: null,
    };

    history = null;

    constructor(props){
        super(props);

        this.deleteFilm = this.deleteFilm.bind(this);
        this.refreshFilms = this.refreshFilms.bind(this);
        this.addFilm = this.addFilm.bind(this);
        this.navigateToDetails = this.navigateToDetails.bind(this);
        this.hideError = this.hideError.bind(this);
    }

    componentWillMount() {
        this.refreshFilms();
    }

    refreshFilms(){
        this.hideError();
        getFilms((success, data) => {

            if(success) {
                this.setState({
                    films: data,
                });
            }
            else{
                if(data) {
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.refreshFilms,
                    });
                }
            }
        });
    }

    addFilm(){
        navigate(this.history, '/addFilm');
    }

    deleteFilm(id){
        deleteFilm(id, (success, data) => {
            if(success) {
                this.refreshFilms();
            }
            else{
                if(data) {
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.hideError,
                    });
                }
            }
        })
    }

    hideError(){
        this.setState({errorVisible: false});
    }

    navigateToDetails(id){
        navigate(this.history, 'film/'+id);
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={this.state.isAdmin} history={this.history}/>
                    <FilmView films={this.state.films} addFilm={this.addFilm} deleteFilm={this.deleteFilm} navigateToDetails={this.navigateToDetails} isAdmin={this.state.isAdmin}/>
                    {this.state.errorVisible ? <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                </div>);
            }} />
        );
    }
}

export default FilmContainer;