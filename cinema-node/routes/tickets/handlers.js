const errors = require("./errors");

const Seat = require('../../db/models/seats');
const Presentation = require('../../db/models/presentations');
const Ticket = require("../../db/models/tickets");
const Auditorium = require("../../db/models/auditoriums");

var ObjectID = require('mongodb').ObjectID;
const populateGetQuery = [
    {path: 'presentation', populate: {path: 'movie'}},
    {path: 'presentation', populate: {path: 'auditorium'}},
    'seat'];

module.exports.create = async (req, res) => {
    let newTicket = req.body;
    let presentationId = newTicket.presentation;

    getPresentationById(presentationId)
        .then(presentation => {
            const presentationDate = new Date(presentation.start);

            if (presentationHasAlreadyStarted(presentationDate)) {
                throw(errors.presentationAlreadyStarted);

            } else {
                if (notSeatIdButRowAndColumn(newTicket)) {
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
    if (notSeatIdButRowAndColumn(ticket) && ticket.presentation !== undefined) {
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

    Seat.findById(ticketToUpdate.seat)
        .then(seat => {
            if (thereIsNo(seat)) {
                return (errors.seatNotFound(res));
            } else {
                checkPresentationAndUpdateTicket(seat, ticketToUpdate, res, req);
            }
        })
        .catch(err => {
            return (errors.databaseError(err, res))
        })
};

module.exports.deleteById = (req, res) => {
    getTicketById(req.params.id, res).then(ticket => {
        getPresentationById(ticket.presentation, res).then(presentation => {
            deleteTicketById(ticket._id, res).then(successCode => {
                res.status(204);
                res.send();
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

const notSeatIdButRowAndColumn = newTicket => newTicket.seat === undefined &&
    newTicket.seatRow !== undefined &&
    newTicket.seatColumn !== undefined;

const createTicketWithSeatRowAndColumn = (presentationId, newTicket) => new Promise((resolve, reject) => {
    getAuditoriumOfPresentation(presentationId)
        .then(auditoriumId => {
            const seatToReserve = {
                row: newTicket.seatRow,
                column: newTicket.seatColumn,
                auditorium: new ObjectID(auditoriumId.toString())
            };
            return(getSeatId(seatToReserve));
        })
        .then(seatId => {
            newTicket = {
                presentation: presentationId,
                seat: seatId,
                sold: false,
            };
            resolve(checkAvailabilityAndCreateTicket(newTicket));
        })
        .catch(err => {
            reject (err);
        });
    // return newTicket;
});

const getAuditoriumOfPresentation = presentationId => {
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

const getSeatId = seatDocument => {
    return new Promise((resolve, reject) => {
        Seat.findOne(seatDocument)
            .then(seat => {
                if (seat === null) {
                    reject(errors.seatNotFound);
                } else {
                    resolve(seat.id);
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
            getSeatId(seatToReserve)
                .then(seatId => {
                    resolve(seatId);
                })
                .catch(err => {
                    reject(err);
                })
        })
        .catch(err => {
            reject(err);
        });
});

const thereIsNo = obj => {
    if (Array.isArray(obj))
        return obj.length === 0;
    else
        return obj === null;
};

const updateTickets = (req, res) => {
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
        .catch(err => errors.databaseError(err, res))
};

const checkPresentationAndUpdateTicket = (seat, ticketToUpdate, res, req) => {
    var seatAuditoriumId = seat.auditorium;
    Presentation.findById(ticketToUpdate.presentation)
        .then(presentation => {
            if (thereIsNo(presentation)) {
                return (errors.presentationNotFound(res));
            } else {
                let presentationAuditoriumId = presentation.auditorium;
                if (seatAuditoriumId.toString() === presentationAuditoriumId.toString()) {
                    updateTickets(req, res);
                } else {
                    return (errors.databaseError(err, res))
                }
            }
        })
};

const deleteTicketById = (ticketId, res) => new Promise((resolve, reject) => {
    const id_filter = {'_id': new ObjectID(ticketId)};
    Ticket.findOneAndDelete(id_filter).then(ticket => {
        resolve();
    })
        .catch(err => {
            errors.databaseError(err, res);
            reject(err)
        });
});

const getTicketById = (ticketId, res) => {
    return new Promise((resolve, reject) => {
        Ticket.findById(ticketId).then(ticket => {
            if (ticket === null) {
                errors.ticketNotFound(res);
                reject("ticket not found");
            } else {
                resolve(ticket);
            }
        })
            .catch(err => {
                errors.databaseError(err, res);
                reject(err)
            });
    });
};
