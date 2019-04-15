import openSocket from 'socket.io-client';
import {urls} from "../utils/urls";
import {parseBusyTimesData, parseTopFilms} from "./dashboard";
import {parseTickets} from "./tickets";

export function setDashboardSocket(callback) {
    const dashboardSocket = openSocket(urls.dashboardNamespace);

    dashboardSocket.on('dashboard', function (response) {

        console.log(response);
        const topFilms = response.topMovies;

        let ticketsSold = 0;
        try {
            ticketsSold = response.soldRatio.soldTickets;
            console.log("ok");
        } catch {
            console.log("error");
            ticketsSold = 0;
        }

        let ticketsReserved = 0;
        try {
            ticketsReserved = response.soldRatio.reservedTickets - ticketsSold;
            console.log("ok");
        } catch {
            console.log("error");
            ticketsReserved = 0;
        }

        const busyTimes = response.busyTimes;

        callback(true, parseTopFilms(topFilms), ticketsReserved, ticketsSold, parseBusyTimesData(busyTimes));
    });
//    TODO: error handling
}

export function setReservingTicketsSocket(presentationId, callback) {
    const reservingTicketsSocket = openSocket(urls.reservingTicketsNamespace);

    reservingTicketsSocket.emit('startReservation', presentationId);

    reservingTicketsSocket.on('ticketList', function (response) {
        callback(true, parseTickets(response));
    });
//    TODO: error handling
}
