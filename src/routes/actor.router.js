const { getAll, create, getOne, update, remove } = require('../controllers/actor.controllers');
const express = require('express');

const actorRouter = express.Router();

actorRouter.route('/actors')
    .get(getAll)
    .post(create)
actorRouter.route('/actors/:id')
    .get(getOne)
    .put(update)
    .delete(remove)

module.exports = actorRouter;