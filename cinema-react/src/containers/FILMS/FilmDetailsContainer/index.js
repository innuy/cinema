import React, {Component} from 'react';
import FilmDetails from "../../../components/FILMS/FilmDetails";
import NavBar from "../../../components/GENERAL/NavBar";

import {editFilm, getSingleFilm} from "../../../API/films";
import {Route} from "react-router-dom";
import {navigateBack} from "../../../utils/navigation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";

class FilmDetailsContainer extends Component {

    history = null;

    state = {
        id: 0,
        film: {},

        errorVisible: false,
        errorCallback: null,
        errorText: "",
    };

    constructor(props) {
        super(props);

        this.editFilm = this.editFilm.bind(this);
        this.obtainFilmData = this.obtainFilmData.bind(this);
        this.hideError = this.hideError.bind(this);
    }

    componentWillMount() {

        this.setState({
            id: this.props.match.params.id,
        }, () => {
            this.obtainFilmData();
        });
    }

    obtainFilmData() {
        this.hideError();
        getSingleFilm(this.state.id, (success, film) => {
            if (success) {
                this.setState({
                    film
                });
            } else {
                this.setState({
                    errorVisible: true,
                    errorText: "There was an error obtaining film details",
                    errorCallback: this.obtainFilmData,
                });
            }
        })
    }

    editFilm(newFilm) {
        editFilm(newFilm, (success) => {
            if (success) {
                navigateBack(this.history);
            } else {
                this.setState({
                    errorVisible: true,
                    errorText: "There was an error saving the film",
                    errorCallback: this.hideError,
                });
            }
        })
    }

    hideError() {
        this.setState({errorVisible: false});
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (
                    <div>
                        <NavBar isAdmin={true} history={this.history}/>
                        <FilmDetails film={this.state.film} callback={this.editFilm} buttonText={"EDIT"}/>
                        {this.state.errorVisible ?
                            <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                    </div>);
            }}
            />
        );
    }
}

export default FilmDetailsContainer;