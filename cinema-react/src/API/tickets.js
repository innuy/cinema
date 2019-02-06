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

export function addTicket(presentationId, userId, callback){

    axios.post(urls.films, {
        presentationId,
        userId,
    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
        console.log(JSON.stringify(error));
        callback(false, "There was an error with the connection");
    });
}

function parseTickets(tickets){
    const res = [];

    for(let i = 0; i < tickets.length; i++){
        if(tickets[i] && tickets[i].presentation && tickets[i].presentation.movie && tickets[i].presentation.auditorium && tickets[i].seat) {
            res.push({
                id: tickets[i]._id,
                presentation:{
                    id: tickets[i].presentation._id,
                },
                film: {
                    name: tickets[i].presentation.movie.name,
                    id: tickets[i].presentation.movie._id
                },
                auditorium: {
                    id: tickets[i].presentation.auditorium._id,
                    number: tickets[i].presentation.auditorium.number,
                    numberOfRows: tickets[i].presentation.auditorium.seatRows,
                    numberOfColumns: tickets[i].presentation.auditorium.seatColumns,
                },
                seat: {
                    id: tickets[i].seat._id,
                    row: tickets[i].seat.row,
                    column: tickets[i].seat.column,
                },
                sold: tickets[i].sold,
                startTime: tickets[i].presentation.start,
            });
        }
    }

    return res;
}

export function getSingleTicket(id, callback){
    axios.get(urls.tickets + "/" + id)
        .then((response) => {
            callback(true, parseTickets([response.data])[0]);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}


export function getTicketsOfPresentation(presentationId, callback){
    axios.get(urls.tickets + "/?presentation=" + presentationId)
        .then((response) => {
            console.log("succ: " + JSON.stringify(response.data));
            callback(true, parseTickets(response.data));
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function getMyTickets(callback){
    axios.get(urls.tickets)
        .then((response) => {
            callback(true, parseTickets(response.data));
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function reserveTicket(presentationId, row, column, callback){

    axios.post(urls.tickets, {
        "presentation": presentationId,
        "seatRow": row,
        "seatColumn": column
    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function editTicket(ticket, callback){
    console.log(ticket);
    axios.put(urls.tickets + "/" + ticket.id, {
        "presentation": ticket.presentation,
        "seat": ticket.seat.id
    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
            console.log(error);
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