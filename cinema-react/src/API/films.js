import axios from 'axios';
import {urls} from '../utils/urls';
import {hasAuthorizationError} from "../utils/errorHandler";
import {getUserToken} from "../utils/cookieStorage";

export function addFilm(film, callback) {

    axios.post(urls.films, {
        name: film.name,
        image: film.image,
        duration: film.duration,
        actors: film.cast,
        summary: film.summary,
        director: film.director,
    }, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            callback(true, response.data._id);
        }).catch((error) => {
        console.log(JSON.stringify(error));
        callback(false, "There was an error with the connection");
    });
}

export function getFilms(callback) {
    axios.get(urls.films, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            callback(true, parseFilms(response.data));
        }).catch((error) => {
        if (error && error.response && !hasAuthorizationError(error)) {
            callback(false, "There was an error obtaining films");
        }
    });
}

export function getSingleFilm(id, callback) {
    axios.get(urls.films + "/" + id, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            callback(true, parseSingleFilm(response.data[0]));
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function editFilm(film, callback) {

    axios.put(urls.films + "/" + film.id, {
        "name": film.name,
        "image": film.image,
        "duration": film.duration,
        "director": film.director,
        "actors": film.cast,
        "summary": film.summary,
    }, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            callback(true);
        }).catch((error) => {
        console.log(JSON.stringify(error));
        callback(false, "There was an error deleting the film");
    });
}

export function deleteFilm(id, callback) {
    axios.delete(urls.films + "/" + id, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            callback(true);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

function parseFilms(films) {
    const res = [];

    for (let i = 0; i < films.length; i++) {
        res.push({
            id: films[i]._id,
            image: films[i].image,
            name: films[i].name,
            summary: films[i].summary,
            director: films[i].director,
            cast: films[i].actors,
            duration: films[i].duration
        })
    }

    return res;
}

function parseSingleFilm(film) {
    const res = {
        id: film._id,
        image: film.image,
        name: film.name,
        summary: film.summary,
        director: film.director,
        cast: film.actors,
        duration: film.duration
    };

    return res;
}

export function addImageToFilm(filmId, filmImage, callback) {

    const config = {headers: {'Content-Type': 'multipart/form-data'}};
    let fd = new FormData();
    fd.append('image', filmImage);

    axios.post(urls.addFilmImage + filmId, fd, config)
        .then((response) => {
            callback(true);
        }).catch((error) => {
        console.log(JSON.stringify(error));
        callback(false, "There was an error with the connection");
    });
}