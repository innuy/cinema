const errors = require("./errors");

const Seat = require('../../db/models/seats');
const Presentation = require('../../db/models/presentations');
const Ticket = require("../../db/models/tickets");
const Auditorium = require("../../db/models/auditoriums");

var ObjectID = require('mongodb').ObjectID;
const populateGetQuery = [
    {path: 'presentation', populate: {path: 'movie'}},
    {path: 'presentation', populate: {path: 'auditorium'}},
    'seat'
];

module.exports.create = async (req, res) => {
    let newTicket = req.body;
    let presentationId = newTicket.presentation;

    getPresentationById(presentationId)
        .then(presentation => {
            const presentationDate = new Date(presentation.start);
            if (presentationHasAlreadyStarted(presentationDate)) {
                throw(errors.presentationAlreadyStarted);
            } else {
                if (requestedWithRowAndColumnInsteadOfId(newTicket)) {
                    return createTicketWithSeatRowAndColumn(presentationId, newTicket);
                } else {
                    return checkAvailabilityAndCreateTicket(newTicket);
                }
            }
        })
        .then(ticket => {
            res.send(ticket);
        })
        .catch(err => {
            if (err instanceof Function) {
                err(res);
            } else {
                errors.databaseError(err, res);
            }
        });
};

module.exports.get = async (req, res) => {
    let ticket = req.query;
    if (requestedWithRowAndColumnInsteadOfId(ticket) && ticket.presentation !== undefined) {
        const seatId = await getSeatIdWithRowAndColumn(ticket);
        ticket = {
            presentation: ticket.presentation,
            seat: seatId,
        };
    }
    Ticket.find(ticket)
        .populate(populateGetQuery)
        .then(tickets => {
            res.send(tickets)
        })
        .catch(err =>
            errors.databaseError(err, res))
};

module.exports.getById = (req, res) => {
    Ticket.findById(req.params.id)
        .populate(populateGetQuery)
        .then(ticket => {
            if (thereIsNo(ticket)) {
                errors.ticketNotFound(res);
            } else {
                res.send(ticket);
            }
        })
        .catch(err => errors.databaseError(err, res))
};

module.exports.putById = (req, res) => {
    let ticketToUpdate = req.body;
    let ticketId = req.params.id;

    Seat.findById(ticketToUpdate.seat)
        .then(seat => {
            if (thereIsNo(seat)) {
                throw(errors.seatNotFound);
            } else {
                return checkPresentationAndUpdateTicket(seat, ticketToUpdate);
            }
        })
        .then(message => {
            return updateTickets(ticketId, ticketToUpdate);
        })
        .then(ticket => {
            res.send();
        })
        .catch(err => {
            if (err instanceof Function) {
                err(res);
            } else {
                errors.databaseError(err, res);
            }
        });
};

module.exports.deleteById = (req, res) => {
    getTicketById(req.params.id)
        .then(async ticket => {
            let presentation = await getPresentationById(ticket.presentation);
            if ((presentation instanceof Function) || (presentation instanceof Error)) {
                throw presentation;
            } else {
                return deleteTicketById(ticket._id);
            }
        })
        .then(ticket => {
            res.status(204);
            res.send();
        })
        .catch(err => {
            if (err instanceof Function) {
                err(res);
            } else {
                errors.databaseError(err, res);
            }
        });
};


const getPresentationById = presentationId => new Promise((resolve, reject) => {
    Presentation.findById(presentationId)
        .then(presentation => {
            if (presentation === null) {
                reject(errors.presentationNotFound);
            } else {
                resolve(presentation);
            }
        })
        .catch(err => {
            reject(err)
        });
});

const presentationHasAlreadyStarted = presentationDate => {
    const now = new Date();
    return now.getTime() >= presentationDate.getTime();
};

const requestedWithRowAndColumnInsteadOfId = newTicket => {
    return newTicket.seat === undefined && newTicket.seatRow !== undefined && newTicket.seatColumn !== undefined;
};

const createTicketWithSeatRowAndColumn = (presentationId, newTicket) => new Promise((resolve, reject) => {
    getAuditoriumIdOfPresentation(presentationId)
        .then(auditoriumId => {
            const seatToReserve = {
                row: newTicket.seatRow,
                column: newTicket.seatColumn,
                auditorium: new ObjectID(auditoriumId.toString())
            };
            return (getOneSeat(seatToReserve));
        })
        .then(seat => {
            newTicket = {
                presentation: presentationId,
                seat: seat.id,
                sold: false,
            };
            resolve(checkAvailabilityAndCreateTicket(newTicket));
        })
        .catch(err => {
            reject(err);
        });
});

const getAuditoriumIdOfPresentation = presentationId => {
    return new Promise((resolve, reject) => {
        Presentation.findOne({'_id': new ObjectID(presentationId)})
            .then(presentation => {
                if (thereIsNo(presentation)) {
                    reject(errors.presentationNotFound);
                } else {
                    resolve(presentation.auditorium);
                }
            })
            .catch(err => {
                reject(err)
            });
    });
};

const getOneSeat = seatDocument => {
    return new Promise((resolve, reject) => {
        Seat.findOne(seatDocument)
            .then(seat => {
                if (seat === null) {
                    reject(errors.seatNotFound);
                } else {
                    resolve(seat);
                }
            })
            .catch(err => {
                reject(err)
            });
    });
};

const checkAvailabilityAndCreateTicket = newTicket => new Promise((resolve, reject) => {
    checkSeatIsAvailable(newTicket)
        .then(message => {
            return createTicket(newTicket);
        })
        .then(ticket => {
            resolve(ticket);
        })
        .catch(err => {
            reject(err)
        });
});

const checkSeatIsAvailable = ticketFilter => new Promise((resolve, reject) => {
    Ticket.findOne(ticketFilter)
        .then(ticket => {
            if (ticket === null) {
                resolve("OK")
            } else {
                reject(errors.unavailableSeat);
            }
        })
        .catch(err => {
            reject(err)
        });
});

const createTicket = newTicket => {
    newTicket.sold = false;
    return new Promise((resolve, reject) => {
        Ticket.create(newTicket)
            .then(ticket => {
                resolve(ticket);
            })
            .catch(err => {
                reject(err)
            });
    });
};

const getSeatIdWithRowAndColumn = ticket => new Promise((resolve, reject) => {
    getPresentationById(ticket.presentation)
        .then(presentation => {
            const auditoriumId = presentation.auditorium;
            const seatToReserve = {
                row: ticket.seatRow,
                column: ticket.seatColumn,
                auditorium: new ObjectID(auditoriumId.toString())
            };
            getOneSeat(seatToReserve)
                .then(seat => {
                    resolve(seat.id);
                })
                .catch(err => {
                    reject(err);
                })
        })
        .catch(err => {
            reject(err);
        });
});

const checkPresentationAndUpdateTicket = (seat, ticketToUpdate) => new Promise((resolve, reject) => {
    var seatAuditoriumId = seat.auditorium;
    Presentation.findById(ticketToUpdate.presentation)
        .then(presentation => {
            if (thereIsNo(presentation)) {
                reject(errors.presentationNotFound);
            } else {
                let presentationAuditoriumId = presentation.auditorium;
                if (seatAuditoriumId.toString() === presentationAuditoriumId.toString()) {
                    resolve("Presentation found");
                } else {
                    reject("Database consistency error")
                }
            }
        })
});

const updateTickets = (ticketId, newTicket) => new Promise((resolve, reject) => {
    const id_filter = {'_id': new ObjectID(ticketId)};
    const setToReturnUpdatedValue = {new: true};
    const parametersToSet = {$set: newTicket};
    Ticket.findOneAndUpdate(
        id_filter,
        parametersToSet,
        setToReturnUpdatedValue,
    )
        .then(ticket => {
            if (thereIsNo(ticket)) {
                reject(errors.ticketNotFound);
            } else {
                resolve(ticket);
            }
        })
        .catch(err => {
            reject(err);
        })
});

const thereIsNo = obj => {
    if (Array.isArray(obj))
        return obj.length === 0;
    else
        return obj === null;
};

const getTicketById = ticketId => {
    return new Promise((resolve, reject) => {
        Ticket.findById(ticketId).then(ticket => {
            if (ticket === null) {
                reject(errors.ticketNotFound);
            } else {
                resolve(ticket);
            }
        })
            .catch(err => {
                reject(err)
            });
    });
};

const deleteTicketById = ticketId => new Promise((resolve, reject) => {
    const id_filter = {'_id': new ObjectID(ticketId)};
    Ticket.findOneAndDelete(id_filter).then(ticket => {
        resolve(ticket);
    })
        .catch(err => {
            reject(err)
        });
});
