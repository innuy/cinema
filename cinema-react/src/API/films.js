import axios from 'axios';
import {urls} from '../utils/urls';
import {getUserToken} from "../utils/cookieStorage";

export function getFilms(callback){

    axios.get(urls.films)
        .then((response) => {
            callback(true, response.data);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function addFilm(film, callback){

    axios.put(urls.films, {film})
        .then((response) => {
            callback(true);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function editFilm(film, callback){
    axios.post(urls.films, {film})
        .then((response) => {
            callback(true);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function deleteFilm(id, callback){
    axios.delete(urls.films, {params: {id}})
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