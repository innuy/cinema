import axios from "axios";
import {urls} from "../utils/urls";
import {hasAuthorizationError} from "../utils/errorHandler";
import {getUserToken} from "../utils/cookieStorage";

export function getTopFilms(callback){
    axios.get(urls.topMovies + '?amount=10', {headers: {"Authorization": 'Token '+ getUserToken()}})
        .then((response) => {
            callback(true, parseTopFilms(response.data));
        }).catch((error) => {
            console.log(JSON.stringify(error));
            if(error && error.response && !hasAuthorizationError(error)) {
                callback(false, "There was an error obtaining auditoriums");
            }
    });
}

export function getSoldRatio(callback){
    axios.get(urls.ticketsSold, {headers: {"Authorization": 'Token '+ getUserToken()}})
        .then((response) => {
            console.log("e");
            callback(true, parseSoldRatioData(response.data));
        }).catch((error) => {
            console.log(JSON.stringify(error));
            if(error && error.response && !hasAuthorizationError(error)) {
                callback(false, "There was an error obtaining auditoriums");
            }
    });
}

function parseTopFilms(topMovies){
    const res = [];

    for(let i = 0; i < topMovies.length; i++){
        //TODO: PARSE TOP FILMS
        res.push({
            id: topMovies[i].movie._id,
            name: topMovies[i].movie.name,
        })
    }

    return res;
}

function parseSoldRatioData(data){
    console.log(JSON.stringify(data));
    return {
        reserved: data.reservedTickets,
        sold: data.soldTickets,
    }
}