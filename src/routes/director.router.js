const { getAll, create, getOne, update, remove } = require('../controllers/director.controllers');
const express = require('express');

const directorRouter = express.Router();

directorRouter.route('/directors')
    .get(getAll)
    .post(create)
directorRouter.route('/directors/:id')
    .get(getOne)
    .put(update)
    .delete(remove)

module.exports = directorRouter;