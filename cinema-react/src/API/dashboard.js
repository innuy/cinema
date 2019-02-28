import axios from "axios";
import {urls} from "../utils/urls";
import {hasAuthorizationError} from "../utils/errorHandler";
import {getUserToken} from "../utils/cookieStorage";

export function getTopFilms(callback){
    axios.get(urls.topMovies + '?amount=10', {headers: {"Authorization": 'Token '+ getUserToken()}})
        .then((response) => {
            callback(true, parseTopFilms(response.data));
        }).catch((error) => {
            if(error && error.response && !hasAuthorizationError(error)) {
                callback(false, "There was an error obtaining top films");
            }
    });
}

export function getSoldRatio(callback){
    axios.get(urls.ticketsSold, {headers: {"Authorization": 'Token '+ getUserToken()}})
        .then((response) => {
            callback(true, parseSoldRatioData(response.data));
        }).catch((error) => {
            if(error && error.response && !hasAuthorizationError(error)) {
                callback(false, "There was an error obtaining sold ratio");
            }
    });
}

export function getBusyTimes(callback){
    axios.get(urls.busyTimes, {headers: {"Authorization": 'Token '+ getUserToken()}})
        .then((response) => {
            callback(true, parseBusyTimesData(response.data));
        }).catch((error) => {
            if(error && error.response && !hasAuthorizationError(error)) {
                callback(false, "There was an error obtaining busy times");
            }
    });
}


export function parseTopFilms(topMovies){
    const res = [];

    for(let i = 0; i < topMovies.length; i++){
        res.push({
            id: topMovies[i].movie._id,
            name: topMovies[i].movie.name,
            ticketsReserved: topMovies[i].reserved,
            ticketsSold: topMovies[i].sold,
        })
    }

    return res;
}

function parseSoldRatioData(data){
    return {
        reserved: data.reservedTickets,
        sold: data.soldTickets,
    }
}

export function parseBusyTimesData(data){

    const res = [];

    for(let i = 0; i < data.length; i++){
        res.push({
            hour: data[i].hour,
            tickets: data[i].tickets,
        })
    }

    return res;
}