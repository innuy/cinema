import React, {Component} from 'react';
import PropTypes from 'prop-types';

import OptionButton from "../OptionButton";

import './styles.css';
import CastElement from "../CastElement/index";

class FilmDetails extends Component {

    constructor(props) {
        super(props);

        this.renderCast = this.renderCast.bind(this);
        this.editCastCallback = this.editCastCallback.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
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
    };

    componentWillMount() {
        if(this.props.film){
            this.setState({
                film: this.props.film
            });
        }
    }

    renderCast(){
        const res = [
            <div className="filmDetailsTitleContainer row">
                <div className="filmDetailsTitle col-8">Cast:</div>
                <button className="filmDetailsTitleButton col-3 offset-1" onClick={() => {
                    const film = this.state.film;
                    film.cast.push("");
                    this.setState({
                        film
                    });
                }}>Add member</button>
            </div>];

        for(let i = 0; i < this.state.film.cast.length; i++){
            res.push(<CastElement key={"castInput_" + i} index={i} text={this.state.film.cast[i]} editCallback={this.editCastCallback}/>);
        }

        return res;
    }

    editCastCallback(index, newText){
        //TODO: CHECK INDEX IS IN RANGE
        const film = this.state.film;
        film.cast[index] = newText;
        this.setState({
            film
        });
    }

    fileChangedHandler(event){
        const file = event.target.files[0];
        if(file.type.startsWith("image/")) {
            this.setState({
                imageFile: file,
                imageError: false,
            });
        }
        else{
            this.setState({
                imageFile: null,
                imageError: true,
            });
        }
        console.log(file);
    }

    render() {
        return (
            <div className="filmDetailsContainer">
                <div className="filmDetailsPageTitle">FILM INFORMATION</div>
                <div className="filmDetailsSeparator"/>
                <div className="filmDetailsTitle">Title:</div>
                <input className="filmInput" value={this.state.film.name} onChange={(event) => {
                    const film = this.state.film;
                    film.name = event.target.value;
                    this.setState({
                       film
                    });
                }}/>
                <div className="filmDetailsSeparator"/>
                <div className="filmDetailsTitle">Image:</div>
                <input type="file" onChange={this.fileChangedHandler} />
                {this.state.imageError ? <div>The file you selected is not of the correct type</div> : null}
                <div className="filmDetailsSeparator"/>
                <div className="filmDetailsTitle">Summary:</div>
                <input className="filmInput" value={this.state.film.summary} onChange={(event) => {
                    const film = this.state.film;
                    film.summary = event.target.value;
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
                {this.renderCast()}

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
                <div className="filmDetailsSeparator"/>
                <div className="filmDetailsSeparator"/>
                <div className="filmDetailsSeparator"/>
                <OptionButton onClick={() => {
                    //TODO: CHECK ALL DATA IS PRESENT
                    this.props.callback(this.state.film);
                }} text={this.props.buttonText}/>
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