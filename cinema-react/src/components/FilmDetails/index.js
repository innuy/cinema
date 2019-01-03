import React, {Component} from 'react';
import PropTypes from 'prop-types';

import OptionButton from "../OptionButton";

import './styles.css';

class FilmDetails extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        film: {
            title: "",
            genre: "",
            director: "",
            cast: "",
            duration: "",
        },
    };

    componentWillMount(){
        /*TODO: SET ORIGINAL STATE OF MOVIE*/
        this.setState({

        });
    }

    render() {
        return (
            <div className="filmDetailsContainer">
                <div className="filmDetailsTitle">Title:</div>
                <input className="filmInput" value={this.state.film.title} onChange={(event) => {
                    const film = this.state.film;
                    film.title = event.target.value;
                    this.setState({
                       film
                    });
                }}/>
                <div className="filmDetailsSeparator"/>
                <div className="filmDetailsTitle">Genre:</div>
                <input className="filmInput" value={this.state.film.genre} onChange={(event) => {
                    const film = this.state.film;
                    film.genre = event.target.value;
                    this.setState({
                        film
                    });
                }}/>
                <div className="filmDetailsSeparator"/>
                <div className="filmDetailsTitle">Director:</div>
                <input className="filmInput" value={this.state.film.director} onChange={(event) => {
                    const film = this.state.film;
                    film.director = event.target.value;
                    this.setState({
                        film
                    });
                }}/>
                <div className="filmDetailsSeparator"/>
                <div className="filmDetailsTitle">Cast:</div>
                <input className="filmInput" value={this.state.film.cast} onChange={(event) => {
                    const film = this.state.film;
                    film.cast = event.target.value;
                    this.setState({
                        film
                    });
                }}/>
                <div className="filmDetailsSeparator"/>
                <div className="filmDetailsTitle">Duration:</div>
                <input className="filmInput" value={this.state.film.duration} onChange={(event) => {
                    const film = this.state.film;
                    film.duration = event.target.value;
                    this.setState({
                        film
                    });
                }}/>
                <div className="filmDetailsSeparator"/>
                <OptionButton onClick={() => {
                    this.props.callback(this.state.film);
                }} text={"Edit"}/>
            </div>
        );
    }
}

FilmDetails.propTypes = {
    film: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
};

export default FilmDetails;