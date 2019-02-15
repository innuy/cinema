import axios from 'axios';
import {urls} from '../utils/urls';
import {getUserToken} from "../utils/cookieStorage";
import {hasAuthorizationError} from "../utils/errorHandler";

export function getAuditoriums(callback){
    axios.get(urls.auditoriums)
        .then((response) => {
            callback(true, parseAuditoriums(response.data));
        }).catch((error) => {
            if(!hasAuthorizationError(error)) {
                callback(false, "There was an error obtaining auditoriums");
            }
    });
}

function parseAuditoriums(auditoriums){
    const res = [];

    for(let i = 0; i < auditoriums.length; i++){
        res.push({id: auditoriums[i]._id,
            number: auditoriums[i].number,
            numberOfRows: auditoriums[i].seatRows,
            numberOfColumns: auditoriums[i].seatColumns})
    }

    return res;
}

function parseSingleAuditorium(auditorium){
    const res = {
        id: auditorium._id,
        number: auditorium.number,
        numberOfRows: auditorium.seatRows,
        numberOfColumns: auditorium.seatColumns
    };

    return res;
}

export function getSingleAuditorium(id, callback){
    axios.get(urls.auditoriums + "/" + id)
        .then((response) => {
            callback(true, parseSingleAuditorium(response.data));
        }).catch((error) => {
            if(!hasAuthorizationError(error)) {
                callback(false, "There was an error with the connection");
            }
    });
}

export function addAuditorium(auditorium, callback){
    axios.post(urls.auditoriums, {
        number: auditorium.number,
        seatRows: auditorium.numberOfRows,
        seatColumns: auditorium.numberOfColumns,
    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
        console.log(JSON.stringify(error));
        callback(false, "There was an error with the connection");
    });
}

export function editAuditorium(auditorium, callback){
    axios.put(urls.auditoriums + "/" + auditorium.id, {
        "number": auditorium.number,
        "seatRows": auditorium.numberOfRows,
        "seatColumns": auditorium.numberOfColumns,
    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
            console.log(JSON.stringify(error));
            callback(false, "There was an error saving the auditorium");
    });
}

export function deleteAuditorium(id, callback){
    axios.delete(urls.auditoriums + "/" + id)
        .then((response) => {
            callback(true);
        }).catch((error) => {
            callback(false, "There was an error deleting the auditorium");
    });
}