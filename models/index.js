const { db, Ticket, User } = require('../database/');
const _ = require('underscore');
const util = require('../helpers/util');


const createTicket = (req, res) => {
  Ticket.create(req.body).then(result => {
    if (!result) { res.sendStatus(500); }
    res.sendStatus(201);
  });
};

const findTickets = (req, res) => {
  let option = {};
  let query = req.query;
  let claimedOrder = 1;
  let openedOrder = 2;
  let closedOrder = 3;
  
  if (query.role === 'student') {
    openedOrder = 1;
    claimedOrder = 2;
    option = {
      status: ['Opened', 'Claimed']
    };
  } else if (query.role === 'mentor') {
    option = {
      status: ['Opened', 'Claimed'],
      $or: [{ claimedBy: query.id }, { claimedBy: null }]
    };
  } else if (query.role === 'admin') {
    option = _.omit(query, ['id', 'role']);
  }

  const otherfunction = function(status) {
    return status;
  };

  Ticket.findAll({
    where: option,
    include: [ { model: User, as: 'user' }, { model: User, as: 'userClaimed' } ],
    order: [
      [db.literal(`CASE
        WHEN status = 'Claimed' THEN ${claimedOrder}
        WHEN status = 'Opened' THEN ${openedOrder}
        WHEN status = 'Closed' THEN ${closedOrder}
        END`
      )],
      ['updatedAt', 'DESC']
    ]
  }).then(result => {
    if (!result) { res.sendStatus(404); }
    res.send(result);
  });
};

const updateTickets = (req, res) => {
  if (req.body.status === 'Claimed') {
    req.body.claimedAt = new Date();
  }
  if (req.body.status === 'Closed') {
    req.body.closedAt = new Date();
  }
  Ticket.update(req.body, { where: { id: req.params.id } })
    .then(result => {
      if (!result) { res.sendStatus(500); }
      res.sendStatus(200);
    });
};

const createUser = (req, res) => {
  User.findOrCreate({ where: req.body })
    .then((user) => {
      res.send(true);
    })
    .catch(err => {
      res.send(false);
    });
};

module.exports = {
  createTicket: createTicket,
  findTickets: findTickets,
  updateTickets: updateTickets,
  createUser: createUser
};
