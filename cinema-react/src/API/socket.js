import openSocket from 'socket.io-client';
import {urls} from "../utils/urls";
import {parseBusyTimesData, parseTopFilms} from "./dashboard";
import {parseTickets} from "./tickets";

export function setDashboardSocket(callback) {
    const  dashboardSocket = openSocket(urls.dashboardNamespace);

    dashboardSocket.on('dashboard', function(response){

        const topFilms = response.topMovies;
        const ticketsSold = response.soldRatio.soldTickets;
        const ticketsReserved = response.soldRatio.reservedTickets - ticketsSold;
        const busyTimes = response.busyTimes;

        callback(true, parseTopFilms(topFilms),ticketsReserved,ticketsSold, parseBusyTimesData(busyTimes));
    });
//    TODO: error handling
}

export function setReservingTicketsSocket(presentationId, callback) {
    const  reservingTicketsSocket = openSocket(urls.reservingTicketsNamespace);

    reservingTicketsSocket.emit('startReservation', presentationId);

    reservingTicketsSocket.on('ticketList', function(response){
        callback(true, parseTickets(response));
    });
//    TODO: error handling
}
