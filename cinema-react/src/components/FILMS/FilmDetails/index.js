import React, {Component} from 'react';
import PropTypes from 'prop-types';

import OptionButton from "../../GENERAL/OptionButton";

import './styles.css';
import CastElement from "../CastElement/index";

class FilmDetails extends Component {

    constructor(props) {
        super(props);

        this.renderCast = this.renderCast.bind(this);
        this.editCastCallback = this.editCastCallback.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.saveFilmData = this.saveFilmData.bind(this);
        this.deleteCastCallback = this.deleteCastCallback.bind(this);
    }

    state = {
        film: {
            id: "",
            name: "",
            summary: "",
            director: "",
            cast: [],
            duration: "",
        },
        imageFile: null,
        imageError: false,
        errors: {
            name: false,
            summary: false,
            director: false,
            cast: false,
            duration: false,
            image: false,
        }
    };

    componentWillReceiveProps(newProps) {

        if (newProps.film) {
            this.setState({
                film: newProps.film
            });
        }
    }

    renderCast() {
        const res = [
            <div className="filmDetailsTitle col-8">Cast:</div>];

        if (this.state.film.cast) {
            for (let i = 0; i < this.state.film.cast.length; i++) {
                res.push(<CastElement key={"castInput_" + i} index={i} text={this.state.film.cast[i]}
                                      editCallback={this.editCastCallback} deleteCallback={this.deleteCastCallback}/>);
            }
        }

        {/*<div key={"castInput_title"} className="filmDetailsTitleContainer row">*/
        }
        res.push(
                <button className="filmDetailsTitleButton col-12"
                        onClick={() => {
                            const film = this.state.film;
                            film.cast.push("");
                            this.setState({
                                film
                            });
                        }}>Add member
                </button>

        );
        // </div>

        return res;
    }

    editCastCallback(index, newText) {

        const film = this.state.film;
        if (film.cast.length > index) {
            film.cast[index] = newText;
            this.setState({
                film
            });
        }
    }

    deleteCastCallback(index) {
        const film = this.state.film;
        if (film.cast.length > index) {
            film.cast.splice(index, 1);
            this.setState({
                film
            });
        }
    }

    fileChangedHandler(event) {
        const file = event.target.files[0];
        if (file.type.startsWith("image/")) {
            this.setState({
                imageFile: file,
                imageError: false,
            });
        } else {
            this.setState({
                imageFile: null,
                imageError: true,
            });
        }
    }

    saveFilmData() {

        const errors = {
            name: false,
            summary: false,
            director: false,
            duration: false,
            cast: false,
        };

        if (!this.state.film.name) {
            errors.name = true;
        }
        if (!this.state.film.summary) {
            errors.summary = true;
        }
        if (!this.state.film.director) {
            errors.director = true;
        }
        if (!this.state.film.duration) {
            errors.duration = true;
        }
        if (!this.state.film.cast || this.state.film.cast.length <= 0) {
            errors.cast = true;
        }
        if (!this.state.imageFile) {
            errors.image = true;
        }

        this.setState({
            errors,
        }, () => {
            if (!this.filmHasErrors()) {
                this.props.callback(this.state.film, this.state.imageFile);
            }
        });

    }

    filmHasErrors() {
        return this.state.errors.name && this.state.errors.summary && this.state.errors.director &&
            this.state.errors.duration && this.state.errors.cast && this.state.errors.image
    }

    render() {
        return (
            <div className="justify-content-center">
                <div className="filmDetailsSeparator"/>
                <div className="filmDetailsSeparator"/>
                <div className="container filmDetailsContainer">
                    <div className="filmDetailsPageTitle">Film Information</div>
                    <div className="filmDetailsSeparator"/>

                    <div className="form-group">
                        <label className="filmDetailsTitle">Title:</label>
                        <input className="form-control" value={this.state.film.name} onChange={(event) => {
                            const film = this.state.film;
                            film.name = event.target.value;
                            this.setState({
                                film
                            });
                        }}/>
                        {this.state.errors.name ?
                            <div className="filmDetailsErrorMessage">There is an error in the name</div> : null}
                    </div>

                    <div className="filmDetailsSeparator"/>

                    <div className="form-group">
                        <div className="filmDetailsTitle">Image:</div>
                        <input type="file" onChange={this.fileChangedHandler}/>
                        {this.state.imageError ? <div>The file you selected is not of the correct type</div> : null}
                        {this.state.errors.image ?
                            <div className="filmDetailsErrorMessage">You need to add an image file</div> : null}
                    </div>

                    <div className="filmDetailsSeparator"/>

                    <div className="form-group">
                        <label className="filmDetailsTitle">Summary:</label>
                        <textarea className="form-control" value={this.state.film.summary} rows="3"
                                  onChange={(event) => {
                                      const film = this.state.film;
                                      film.summary = event.target.value;
                                      this.setState({
                                          film
                                      });
                                  }}/>
                        {this.state.errors.summary ?
                            <div className="filmDetailsErrorMessage">There is an error in the summary</div> : null}
                    </div>

                    <div className="filmDetailsSeparator"/>

                    <div className="form-group">
                        <label className="filmDetailsTitle">Director:</label>
                        <input className="form-control" value={this.state.film.director} onChange={(event) => {
                            const film = this.state.film;
                            film.director = event.target.value;
                            this.setState({
                                film
                            });
                        }}/>
                        {this.state.errors.director ?
                            <div className="filmDetailsErrorMessage">There is an error in the director</div> : null}
                    </div>

                    <div className="filmDetailsSeparator"/>

                    <div className="form-group">
                        {this.renderCast()}
                        {this.state.errors.cast ?
                            <div className="filmDetailsErrorMessage">There is an error in the cast</div> : null}
                    </div>

                    <div className="filmDetailsSeparator"/>

                    <div className="form-group">
                        <label className="filmDetailsTitle">Duration:</label>
                        <input className="form-control" value={this.state.film.duration} onChange={(event) => {
                            const film = this.state.film;
                            film.duration = event.target.value;
                            this.setState({
                                film
                            });
                        }}/>
                        {this.state.errors.duration ?
                            <div className="filmDetailsErrorMessage">There is an error in the duration</div> : null}
                    </div>

                    <div className="filmDetailsSeparator"/>
                    <div className="filmDetailsSeparator"/>
                    <div className="filmDetailsSeparator"/>
                    <div className="filmDetailsSeparator"/>
                    <OptionButton onClick={this.saveFilmData} text={this.props.buttonText}/>
                </div>
                <div className="filmDetailsSeparator"/>
                <div className="filmDetailsSeparator"/>
            </div>
        );
    }
}

FilmDetails.propTypes = {
    film: PropTypes.object,
    callback: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
};

export default FilmDetails;