import openSocket from 'socket.io-client';
import {urls} from "../utils/urls";
import axios from "axios";
import {parseTickets} from "./tickets";

export function setDashboardSocket(callback) {
    const  dashboardSocket = openSocket(urls.dashboardNamespace);

    dashboardSocket.on('dashboard', function(response){
        // callback(true, parseTickets(response.data));
    //    TODO: parse dashboard data. Add structure to divide the messages
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

