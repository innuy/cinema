import axios from 'axios';
import {urls} from '../utils/urls';
import {getUserToken} from "../utils/cookieStorage";

export function getAuditoriums(callback){
    axios.get(urls.auditoriums)
        .then((response) => {
            callback(true, parseAuditoriums(response.data));
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

function parseAuditoriums(auditoriums){
    const res = [];

    for(let i = 0; i < auditoriums.length; i++){
        res.push({id: auditoriums[i]._id,
            number: auditoriums[i].number,
            numberOfRows: auditoriums[i].rows,
            numberOfColumns: auditoriums[i].columns})
    }

    return res;
}

export function getSingleAuditorium(id, callback){
    axios.get(urls.auditoriums + "/" + id)
        .then((response) => {
            callback(true, response.data);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function addAuditorium(auditorium, callback){

    axios.post(urls.auditoriums, {
        number: auditorium.number,
        rows: auditorium.numberOfRows,
        columns: auditorium.numberOfColumns,
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
        "number": auditorium.name,
        "rows": auditorium.numberOfRows,
        "columns": auditorium.numberOfColumns,
    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function deleteAuditorium(id, callback){
    axios.delete(urls.auditoriums + "/" + id)
        .then((response) => {
            callback(true);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}