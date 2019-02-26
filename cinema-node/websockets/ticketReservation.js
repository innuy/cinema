
let app;
app = require('../app');
let getTicketByPresentationId;

const sendTicketListToCurrentPresentationRoom = async presentationId => await new Promise((resolve, reject) => {
    getTicketByPresentationId = require("../routes/tickets/handlers").getTicketByPresentationId;

    let reservingTicketsNamespace = app.reservingTicketsNamespace;
    const presentationRoom = 'presentation-' + presentationId;

    getTicketByPresentationId(presentationId)
        .then(tickets => {
            reservingTicketsNamespace.to(presentationRoom).emit('ticketList', tickets);
            resolve(tickets);
        })
        .catch(err => {
            reservingTicketsNamespace.to(presentationRoom).emit('ticketListFailed', err);
            reject(err);
        })
});

const startingTicketReservation = async (presentationId, socket) => await new Promise((resolve, reject) => {
    getTicketByPresentationId = require("../routes/tickets/handlers").getTicketByPresentationId;

    getTicketByPresentationId(presentationId)
        .then(tickets => {
            socket.emit('ticketList', tickets);
            resolve(tickets);
        })
        .catch(err => {
            socket.emit('ticketListFailed', err);
            reject(err);
        })
});

module.exports.startingTicketReservation = startingTicketReservation;
module.exports.sendTicketListToCurrentPresentationRoom = sendTicketListToCurrentPresentationRoom;
