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
        res.push({id: presentations[i]._id,
            film: presentations[i].film,
            auditorium: presentations[i].auditorium,
            startTime: presentations[i].startTime,
            tickets: presentations[i].tickets})
    }

    return res;
}

export function getSinglePresentation(id, callback){
    axios.get(urls.presentations + "/" + id)
        .then((response) => {
            callback(true, response.data);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function addPresentation(presentation, callback){

    axios.post(urls.presentations, {
        film: presentation.film,
        auditorium: presentation.auditorium,
        startTime: presentation.startTime,
    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function editPresentation(presentation, callback){
    axios.put(urls.presentations + "/" + presentation.id, {
        "film": presentation.film,
        "auditorium": presentation.auditorium,
        "startTime": presentation.startTime,
    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
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