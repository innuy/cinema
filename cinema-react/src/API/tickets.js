import axios from 'axios';
import {urls} from '../utils/urls';
import {getUserToken} from "../utils/cookieStorage";
import {hasAuthorizationError} from "../utils/errorHandler";

export function addTicket(presentationId, userId, callback) {

    axios.post(urls.films, {
        presentationId,
        userId,
    }, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            callback(true);
        }).catch((error) => {
        if (error && error.response && !hasAuthorizationError(error)) {
            callback(false, "There was an error adding the ticket");
        }
    });
}

export function reserveTicket(presentationId, row, column, callback) {

    axios.post(urls.tickets, {
        presentation: presentationId,
        seatRow: row,
        seatColumn: column
    }, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then(() => {
            callback(true);
        }).catch((error) => {
        if (error.response.data.message) {
            callback(false, error.response.data.message);
        } else {
            callback(false, "There was an error reserving the ticket");
        }
    });
}

export function getTickets(callback) {
    axios.get(urls.tickets, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            callback(true, parseTickets(response.data));
        }).catch((error) => {
        if (error && error.response && !hasAuthorizationError(error)) {
            callback(false, "There was an error getting tickets");
        }
    });
}

export function getSingleTicket(id, callback) {
    axios.get(urls.tickets + "/" + id, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            callback(true, parseTickets([response.data])[0]);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}


export function getTicketsOfPresentation(presentationId, callback) {
    axios.get(urls.tickets + "/?presentation=" + presentationId, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            callback(true, parseTickets(response.data));
        }).catch((error) => {
        callback(false, "There was an error obtaining tickets");
    });
}

export function getMyTickets(callback) {
    axios.get(urls.tickets, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            callback(true, parseTickets(response.data));
        }).catch((error) => {
        if (error && error.response && !hasAuthorizationError(error)) {
            callback(false, "There was an error obtaining tickets");
        }
    });
}

export function editTicket(ticket, callback) {
    axios.put(urls.tickets + "/" + ticket.id, {
        presentation: ticket.presentation.id,
        seat: ticket.seat.id,
        sold: ticket.sold,
    }, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            callback(true);
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function deleteTicket(id, callback) {
    axios.delete(urls.tickets + "/" + id, {headers: {"Authorization": 'Token ' + getUserToken()}})
        .then((response) => {
            callback(true);
        }).catch((error) => {
        if (error && error.response && !hasAuthorizationError(error)) {
            callback(false, "There was an error deleting the ticket");
        }
    });
}

export function parseTickets(tickets) {
    const res = [];

    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i] && tickets[i].presentation && tickets[i].presentation.movie && tickets[i].presentation.auditorium && tickets[i].seat) {
            res.push({
                id: tickets[i]._id,
                presentation: {
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