import axios from 'axios';
import {urls} from '../utils/urls';
import {getUserToken} from "../utils/cookieStorage";

export function getTickets(callback){
    axios.get(urls.tickets)
        .then((response) => {
            callback(true, parseTickets(response.data));
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

function parseTickets(tickets){
    const res = [];

    for(let i = 0; i < tickets.length; i++){
        /*TODO: PARSE TICKET */
        res.push({})
    }

    return res;
}

export function getSingleTicket(id, callback){
    axios.get(urls.tickets + "/" + id)
        .then((response) => {
            callback(true, response.data);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function reserveTicket(presentationId, callback){

    axios.post(urls.tickets, {
        /*TODO: SEND presentationId DATA*/
    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function editTicket(ticket, callback){
    axios.put(urls.tickets + "/" + ticket.id, {
        "film": ticket.film,
        "auditorium": ticket.auditorium,
        "startTime": ticket.startTime,
    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function deleteTicket(id, callback){
    axios.delete(urls.tickets + "/" + id)
        .then((response) => {
            callback(true);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}