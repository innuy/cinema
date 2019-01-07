import axios from 'axios';
import {urls} from '../utils/urls';
import {getUserToken} from "../utils/cookieStorage";

export function getFilms(callback){
    axios.get(urls.films)
        .then((response) => {
            callback(true, parseFilms(response.data));
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

function parseFilms(films){
    const res = [];

    for(let i = 0; i < films.length; i++){
        console.log(JSON.stringify(films[i]));
        res.push({id: films[i]._id,
            image: films[i].image,
            name: films[i].name,
            summary: films[i].summary,
            director: films[i].director,
            cast: films[i].actors,
            duration: films[i].duration})
    }

    return res;
}

export function getSingleFilm(id, callback){
    axios.get(urls.films + "/" + id)
        .then((response) => {
            callback(true, response.data);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function addFilm(film, callback){

    axios.post(urls.films, {
        name: film.name,
        image: film.image,
        duration: film.duration,
        actors: film.cast,
        summary: film.summary,
        director: film.director,
    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
        console.log(JSON.stringify(error));
        callback(false, "There was an error with the connection");
    });
}

export function editFilm(film, callback){
    axios.put(urls.films + "/" + film.id, {
        "name": film.name,
        "image": film.image,
        "duration": film.duration,
        "director": film.director,
        "actors": film.cast,
        "summary": film.summary,
    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function deleteFilm(id, callback){
    axios.delete(urls.films + "/" + id)
        .then((response) => {
            callback(true);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

/*export function joinGame(gameId, callback) {
    console.log("Joining to game");

    let userToken = getUserToken();
    axios.post(urls.joinGame, {
        userToken,
        gameId,
    },{
        'Content-Type': "application/json"
    }).then((response) => {
        console.log('Join to new game');
        saveGameToken(response.data.token);
        callback(true, response.data);
    }).catch((error) => {
        callback(false, "There was an error with the request");
    });
}
*/