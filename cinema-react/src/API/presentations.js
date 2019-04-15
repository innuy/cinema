import axios from 'axios';
import {urls} from '../utils/urls';
import {getUserToken} from "../utils/cookieStorage";
import {hasAuthorizationError} from "../utils/errorHandler";

export function addPresentation(presentation, callback) {
    axios.post(urls.presentations, {
        movie: presentation.film,
        auditorium: presentation.auditorium,
        start: presentation.startTime,
    }, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            callback(true);
        }).catch((error) => {
        console.log(JSON.stringify(error));
        callback(false, "There was an error with the connection");
    });
}

export function getPresentations(callback) {
    axios.get(urls.presentations, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            console.log(response);
            callback(true, parsePresentations(response.data));
        }).catch((error) => {
        console.log(JSON.stringify(error));
        if (error && error.response && !hasAuthorizationError(error)) {
            callback(false, "There was an error obtaining presentations");
        }
    });
}

export function getSinglePresentation(id, callback) {
    axios.get(urls.presentations + "/" + id, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            callback(true, parseSinglePresentation(response.data[0]));
        }).catch((error) => {
        callback(false, "There was an error obtaining data");
    });
}

export function editPresentation(presentation, callback) {
    axios.put(urls.presentations + "/" + presentation.id, {
        "movie": presentation.film,
        "auditorium": presentation.auditorium,
        "start": presentation.startTime,
    }, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            callback(true);
        }).catch((error) => {
        if (error && error.response && !hasAuthorizationError(error)) {
            callback(false, "There was an error editing the presentation");
        }
    });
}

export function deletePresentation(id, callback) {
    axios.delete(urls.presentations + "/" + id, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            callback(true);
        }).catch((error) => {
        if (error && error.response && !hasAuthorizationError(error)) {
            callback(false, "There was an error deleting the presentation");
        }
    });
}

function parsePresentations(presentations) {
    const res = [];
    for (let i = 0; i < presentations.length; i++) {
        console.log(presentations[i]);

        if (presentations[i] && presentations[i].movie && presentations[i].auditorium && presentations[i].auditorium[0]) {
            res.push({
                id: presentations[i]._id,
                film: presentations[i].movie,
                auditorium: presentations[i].auditorium,
                startTime: presentations[i].start,
                tickets: presentations[i].soldTickets,
                auditoriumData: {
                    id: presentations[i].auditorium[0]._id,
                    number: presentations[i].auditorium[0].number,
                    numberOfRows: presentations[i].auditorium[0].seatRows,
                    numberOfColumns: presentations[i].auditorium[0].seatColumns,
                }
            });
        }
    }

    return res;
}

function parseSinglePresentation(presentation) {

    let res = {};

    if (presentation && presentation.movie && presentation.auditorium) {
        res = {
            id: presentation._id,
            film: presentation.movie,
            auditorium: presentation.auditorium[0]._id,
            startTime: presentation.start,
            tickets: presentation.soldTickets,
            auditoriumData: {
                id: presentation.auditorium[0]._id,
                number: presentation.auditorium[0].number,
                numberOfRows: presentation.auditorium[0].seatRows,
                numberOfColumns: presentation.auditorium[0].seatColumns,
            }
        };
    }

    return res;
}