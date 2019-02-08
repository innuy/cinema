import React, { Component } from 'react';
import FilmDetails from "../../../components/FILMS/FilmDetails";
import NavBar from "../../../components/GENERAL/NavBar";

import {editFilm, getSingleFilm} from "../../../API/films";
import {Route} from "react-router-dom";
import {navigateBack} from "../../../utils/navigation";

class FilmDetailsContainer extends Component {

    history = null;

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
        }, () => {
            getSingleFilm(this.state.id, (success, film) => {
                if(success) {
                    this.setState({
                        film
                    });
                }
                else{
                    /* TODO: HANDLE ERROR */
                }
            })
        });


    }

    editFilm(newFilm){
        editFilm(newFilm, (success) => {
            if(success){
                navigateBack(this.history);
            }
            else{
                //TODO: SHOW ERROR
            }
        })
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (
                    <div>
                        <NavBar isAdmin={true} history={this.history}/>
                        <FilmDetails film={this.state.film} callback={this.editFilm} buttonText={"EDIT"}/>
                    </div>);}}
            />
        );
    }
}

export default FilmDetailsContainer;