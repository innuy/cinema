const errors = require("./errors");

const Seat = require('../../db/models/seats');
const Presentation = require('../../db/models/presentations');
const Ticket = require("../../db/models/tickets");
const Auditorium = require("../../db/models/auditoriums");

var ObjectID = require('mongodb').ObjectID;


function updatePresentationSoldTickets(ticket, presentation, res) {
    console.log("update presentation sold tickets");
    const id_filter = {'_id': new ObjectID(ticket.presentation)};
    const setToReturnUpdatedValue = {new: true};
    const parametersToSet = {$set: {soldTickets: presentation.soldTickets + 1}};
    Presentation.findOneAndUpdate(
        id_filter,
        parametersToSet,
        setToReturnUpdatedValue,
    )
        .then(presentation => {
            if (presentation === null) {
                errors.presentationNotFound(res);
            } else {
                res.send();
            }
        })
        .catch(err => errors.databaseError(err, res));
}

function createTicket(newTicket, presentation, res) {
    console.log("create ticket");
    return new Promise((resolve, reject) => {
        Ticket.create(newTicket)
            .then(ticket => {
                updatePresentationSoldTickets(newTicket, presentation, res);
                resolve(ticket);
            })
            .catch(err => reject(errors.databaseError(res, err)));
    });
}

function checkSeatIsAvailable(ticketFilter, res) {
    console.log("check if seat is available");
    console.log(ticketFilter);
    return new Promise((resolve, reject) => {
        Ticket.findOne(ticketFilter)
            .then(ticket => {
                if (ticket === null) {
                    resolve("OK")
                } else {
                    errors.unavailableSeat(res);
                    reject("seat is unavailable");
                }
            })
            .catch(err => reject(errors.databaseError(res, err)));
    });
}

const getAuditoriumOfPresentation = (presentationId, res) => {
    console.log("get auditorium of presentation");
    console.log(presentationId);
    return new Promise((resolve, reject) => {
        Presentation.findOne({'_id': new ObjectID(presentationId)})
            .then(presentation => {
                if (presentation === null) {
                    reject(errors.presentationNotFound(res));
                } else {
                    resolve(presentation.auditorium);
                }
            })
            .catch(err => reject(errors.databaseError(res, err)));
    });
};

const getSeatId = (seatDocument, res) => {
    console.debug("get seat id");
    console.log(seatDocument);
    return new Promise((resolve, reject) => {
        Seat.findOne({
            row: seatDocument.row,
            column: seatDocument.column,
            auditorium: new ObjectID(seatDocument.auditorium)
        }).then(seat => {
            if (seat === null) {
                reject(errors.seatNotFound());
            } else {
                resolve(seat.id);
            }
        })
            .catch(err => reject(errors.databaseError(res, err)));
    });
};

function getPresentation(presentationId, res) {
    console.log("get presentation");
    return new Promise((resolve, reject) => {
        Presentation.findOne({'_id': new ObjectID(presentationId)})
            .then(presentation => {
                if (presentation === null) {
                    errors.presentationNotFound(res);
                    reject("presentation not found")
                } else {
                    resolve(presentation);
                }
            })
            .catch(err => reject(errors.databaseError(res, err)));
    });
}

function notSeatIdButRowAndColumn(newTicket) {
    return newTicket.seat === undefined &&
        newTicket.seatRow !== undefined &&
        newTicket.seatColumn !== undefined;
}

module.exports.create = async (req, res) => {
    let newTicket = req.body;
    let presentationId = newTicket.presentation;

    getPresentation(presentationId, res)
        .then(presentation => {
            let now = new Date();
            let presentationDate = new Date(presentation.start);
            if (now.getTime() >= presentationDate.getTime()) {
                console.log(now.getTime());
                console.log(presentationDate.getTime());
                errors.presentationAlreadyStarted(res, presentationId);
                return ('presentation id=' + presentationId + ' already started');
            } else {
                if (notSeatIdButRowAndColumn(newTicket)) {
                    getAuditoriumOfPresentation(presentationId, res)
                        .then(auditoriumId => {
                            const seatToReserve = {
                                row: newTicket.seatRow,
                                column: newTicket.seatColumn,
                                auditorium: auditoriumId.toString()
                            };
                            getSeatId(seatToReserve, res)
                                .then(seatId => {
                                    newTicket = {
                                        presentation: presentationId,
                                        seat: seatId,
                                    };
                                    checkSeatIsAvailable(newTicket, res)
                                        .then(message => {
                                            console.log("createTicket");
                                            createTicket(newTicket, presentation, res)
                                                .then(ticket => {
                                                    res.send(ticket);
                                                })
                                        })
                                        .catch(err => {
                                            return (err)
                                        });
                                })
                                .catch(err => {
                                    return (err)
                                });
                        })
                        .catch(err => {
                            return (err)
                        });

                } else {
                    checkSeatIsAvailable(newTicket, res)
                        .then(message => {
                            console.log("createTicket");
                            createTicket(newTicket, presentation, res)
                                .then(ticket => {
                                    res.send(ticket);
                                })
                        })
                        .catch(err => {
                            return (err)
                        });
                }
            }
        })
        .catch(err => {
            return (err)
        });
};

async function getSeatIdWithRowAndColumn(ticket, res) {
    return new Promise((resolve, reject) => {
        getPresentation(ticket.presentation, res)
            .then(presentation => {
                getAuditoriumOfPresentation(ticket.presentation, res)
                    .then(auditoriumId => {
                        const seatToReserve = {
                            row: ticket.seatRow,
                            column: ticket.seatColumn,
                            auditorium: auditoriumId.toString()
                        };
                        getSeatId(seatToReserve, res)
                            .then(seatId => {
                                console.log("seat id :" + seatId + "+++++++++++++++++++++++++++++++++++")
                                resolve (seatId);
                            })
                            .catch(err => {
                                reject (err);
                            });
                    })
                    .catch(err => {
                        reject (err);
                    });
            })
            .catch(err => {
                reject (err);
            });
    });
}

module.exports.get = async (req, res) => {
    //make the get ID from row and column and put it into the create function
    let ticket = req.query;
    if (notSeatIdButRowAndColumn(ticket) && ticket.presentation !== undefined) {
        const seatId = await getSeatIdWithRowAndColumn(ticket, res);
        ticket = {
            presentation: ticket.presentation,
            seat: seatId,
        };
    }
    // console.log("TICKET FILTER------------------------------------------------------------------------");
    // console.log(ticket);
    Ticket.find(ticket)
        .then(presentation => res.send(presentation))
        .catch(err => errors.databaseError(err, res))
};

function thereIsNo(obj) {
    if (Array.isArray(obj))
        return obj.length === 0;
    else
        return obj === null;
}

module.exports.getById = (req, res) => {
    const id_filter = {'_id': new ObjectID(req.params.id)};

    Ticket.find(id_filter)
        .then(ticket => {
            if (thereIsNo(ticket)) {
                errors.ticketNotFound(res);
            } else {
                res.send(ticket);
            }
        })
        .catch(err => errors.databaseError(err, res))
};

function updateTickets(req, res) {
    const id_filter = {'_id': new ObjectID(req.params.id)};
    const setToReturnUpdatedValue = {new: true};
    const parametersToSet = {$set: req.body};
    Ticket.findOneAndUpdate(
        id_filter,
        parametersToSet,
        setToReturnUpdatedValue,
    )
        .then(ticket => {
            if (thereIsNo(ticket)) {
                errors.ticketNotFound(res);
            } else {
                res.send();
            }
        })
}

module.exports.putById = (req, res) => {
    let ticketToUpdate = req.body;

    Seat.findById(ticketToUpdate.seat)
        .then(seat => {
            if (thereIsNo(seat)){
                return(errors.seatNotFound(res));
            }
            else{
                let seatAuditoriumId = seat.auditorium;
                Presentation.findById(ticketToUpdate.presentation)
                    .then(presentation =>{

                        if (thereIsNo(seat)){
                            return(errors.seatNotFound(res));
                        }
                        else {
                            let presentationAuditoriumId = presentation.auditorium;
                            if (seatAuditoriumId.toString() === presentationAuditoriumId.toString()) {
                                updateTickets(req, res);
                            }
                        }
                    })
            }
        })
        .catch(err => {return(errors.databaseError(err, res))})
};


module.exports.deleteById = (req, res) => {
    const id_filter = {'_id': new ObjectID(req.params.id)};
    Ticket.find(id_filter)
        .then(tickets => {
            if (thereIsNo(tickets)) {
                errors.ticketNotFound(res);
            } else {
                deleteTicketById(id_filter, res);
            }
        })
        .catch(err => errors.databaseError(err, res))
};

function deleteTicketById(id_filter, res) {
    Ticket.findOneAndDelete(id_filter)
        .then(ticket => {
            res.status(204);
            res.send({});
        })
        .catch(err => errors.databaseError(err, res))
}
