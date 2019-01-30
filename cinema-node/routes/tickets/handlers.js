const errors = require("./errors");

const Seat = require('../../db/models/seats');
const Presentation = require('../../db/models/presentations');
const Ticket = require("../../db/models/tickets");
const Auditorium = require("../../db/models/auditoriums");

var ObjectID = require('mongodb').ObjectID;

module.exports.create = async (req, res) => {
    let newTicket = req.body;
    let presentationId = newTicket.presentation;

    getPresentationById(presentationId, res)
        .then(presentation => {
            const presentationDate = new Date(presentation.start);

            if (presentationHasAlreadyStarted(presentationDate)) {
                errors.presentationAlreadyStarted(res, presentationId);
                return ('presentation id=' + presentationId + ' already started');
            } else {
                if (notSeatIdButRowAndColumn(newTicket)) {
                    createTicketWithSeatRowAndColumn(presentationId, res, newTicket);
                } else {
                    checkAvailabilityAndCreateTicket(newTicket, res);
                }
            }
        })
        .catch(err => {
            return (err)
        });
};

module.exports.get = async (req, res) => {

    let ticket = req.query;
    if (notSeatIdButRowAndColumn(ticket) && ticket.presentation !== undefined) {
        const seatId = await getSeatIdWithRowAndColumn(ticket, res);
        ticket = {
            presentation: ticket.presentation,
            seat: seatId,
        };
    }

    Ticket.find(ticket)
        .populate({path: 'presentation', populate: {path: 'movie'}})
        .populate({path: 'presentation', populate: {path: 'auditorium'}})
        .populate('seat')
        .then(tickets => {
            res.send(tickets)
        })
        .catch(err =>
            errors.databaseError(err, res))
};
module.exports.getById = (req, res) => {
    Ticket.findById(req.params.id)
        .populate({path: 'presentation', populate: {path: 'movie'}})
        .populate({path: 'presentation', populate: {path: 'auditorium'}})
        .populate('seat')
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

const getPresentationById = (presentationId, res) => new Promise((resolve, reject) => {
    Presentation.findById(presentationId)
        .then(presentation => {
            if (presentation === null) {
                errors.presentationNotFound(res);
                reject("presentation not found")
            } else {
                resolve(presentation);
            }
        })
        .catch(err => {
            errors.databaseError(err, res);
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

const createTicketWithSeatRowAndColumn = (presentationId, res, newTicket) => {
    getAuditoriumOfPresentation(presentationId, res)
        .then(auditoriumId => {
            const seatToReserve = {
                row: newTicket.seatRow,
                column: newTicket.seatColumn,
                auditorium: auditoriumId.toString()
            };
            return getSeatId(seatToReserve, res)
        })
        .then(seatId => {
            newTicket = {
                presentation: presentationId,
                seat: seatId,
                sold: false,
            };
            checkAvailabilityAndCreateTicket(newTicket, res);
        })
        .catch(err => {
            return (err)
        });
    return newTicket;
};

const getAuditoriumOfPresentation = (presentationId, res) => {
    return new Promise((resolve, reject) => {
        Presentation.findOne({'_id': new ObjectID(presentationId)})
            .then(presentation => {
                if (thereIsNo(presentation)) {
                    reject(errors.presentationNotFound(res));
                } else {
                    resolve(presentation.auditorium);
                }
            })
            .catch(err => {
                errors.databaseError(err, res);
                reject(err)
            });
    });
};

const getSeatId = (seatDocument, res) => {
    return new Promise((resolve, reject) => {
        Seat.findOne({
            row: seatDocument.row,
            column: seatDocument.column,
            auditorium: new ObjectID(seatDocument.auditorium)
        }).then(seat => {
            if (seat === null) {
                reject(errors.seatNotFound(res));
            } else {
                resolve(seat.id);
            }
        })
            .catch(err => {
                errors.databaseError(err, res);
                reject(err)
            });
    });
};

const checkAvailabilityAndCreateTicket = (newTicket, res) => {
    checkSeatIsAvailable(newTicket, res)
        .then(message => {
            createTicket(newTicket, res)
                .then(ticket => {
                    res.send(ticket);
                })
        })
        .catch(err => {
            return (err)
        });
};

const checkSeatIsAvailable = (ticketFilter, res) => new Promise((resolve, reject) => {
    Ticket.findOne(ticketFilter)
        .then(ticket => {
            if (ticket === null) {
                resolve("OK")
            } else {
                errors.unavailableSeat(res);
                reject("seat is unavailable");
            }
        })
        .catch(err => {
            errors.databaseError(err, res);
            reject(err)
        });
});

const createTicket = (newTicket, res) => {
    newTicket.sold = false;
    return new Promise((resolve, reject) => {
        Ticket.create(newTicket)
            .then(ticket => {
                resolve(ticket);
            })
            .catch(err => {
                errors.databaseError(err, res);
                reject(err)
            });
    });
};

const getSeatIdWithRowAndColumn = (ticket, res) => new Promise((resolve, reject) => {
    getPresentationById(ticket.presentation, res)
        .then(presentation => {
            const auditoriumId = presentation.auditorium;
            const seatToReserve = {
                row: ticket.seatRow,
                column: ticket.seatColumn,
                auditorium: auditoriumId.toString()
            };
            getSeatId(seatToReserve, res)
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
