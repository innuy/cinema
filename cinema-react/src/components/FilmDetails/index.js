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
                    this.setState({
                       title: event.target.value
                    });
                }}/>
                <div className="filmDetailsSeparator"/>
                <div className="filmDetailsTitle">Genre:</div>
                <input className="filmInput" value={this.state.film.genre} onChange={(event) => {
                    this.setState({
                        genre: event.target.value
                    });
                }}/>
                <div className="filmDetailsSeparator"/>
                <div className="filmDetailsTitle">Director:</div>
                <input className="filmInput" value={this.state.film.director} onChange={(event) => {
                    this.setState({
                        director: event.target.value
                    });
                }}/>
                <div className="filmDetailsSeparator"/>
                <div className="filmDetailsTitle">Cast:</div>
                <input className="filmInput" value={this.state.film.cast} onChange={(event) => {
                    this.setState({
                        cast: event.target.value
                    });
                }}/>
                <div className="filmDetailsSeparator"/>
                <div className="filmDetailsTitle">Duration:</div>
                <input className="filmInput" value={this.state.film.duration} onChange={(event) => {
                    this.setState({
                        duration: event.target.value
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