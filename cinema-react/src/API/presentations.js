import axios from 'axios';
import {urls} from '../utils/urls';
import {getUserToken} from "../utils/cookieStorage";

export function getPresentations(callback){
    axios.get(urls.presentations)
        .then((response) => {
            callback(true, parsePresentations(response.data));
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

function parsePresentations(presentations){
    const res = [];
    for(let i = 0; i < presentations.length; i++){

        if(presentations[i] && presentations[i].movie && presentations[i].auditorium) {
            res.push({
                id: presentations[i]._id,
                film: presentations[i].movie,
                auditorium: presentations[i].auditorium,
                startTime: presentations[i].start,
                tickets: presentations[i].soldTickets
            });
        }
    }

    return res;
}

function parseSinglePresentation(presentation){

    let res = {};

    if(presentation && presentation.movie && presentation.auditorium) {
        res = {
            id: presentation._id,
            film: presentation.movie,
            auditorium: presentation.auditorium,
            startTime: presentation.start,
            tickets: presentation.soldTickets
        };
    }

    return res;
}

export function getSinglePresentation(id, callback){
    axios.get(urls.presentations + "/" + id)
        .then((response) => {
            callback(true, parseSinglePresentation(response.data[0]));
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function addPresentation(presentation, callback){

    axios.post(urls.presentations, {
        movie: presentation.film,
        auditorium: presentation.auditorium,
        start: presentation.startTime,
    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
            console.log(JSON.stringify(error));
        callback(false, "There was an error with the connection");
    });
}

export function editPresentation(presentation, callback){
    axios.put(urls.presentations + "/" + presentation.id, {
        "movie": presentation.film,
        "auditorium": presentation.auditorium,
        "start": presentation.startTime,
    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
            console.log(JSON.stringify(error));
        callback(false, "There was an error with the connection");
    });
}

export function deletePresentation(id, callback){
    axios.delete(urls.presentations + "/" + id)
        .then((response) => {
            callback(true);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}