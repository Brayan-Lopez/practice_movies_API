const { 
    getAll, create, getOne, update, remove, setMovieActors, setMovieDirectors, setMoviegenres
} = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/movies')
    .get(getAll)
    .post(create)

movieRouter.route('/movies/:id')
    .get(getOne)
    .put(update)
    .delete(remove)

movieRouter.route('/movies/:id/actors')
    .post(setMovieActors)

movieRouter.route('/movies/:id/directors')
    .post(setMovieDirectors)

movieRouter.route('/movies/:id/genres')
    .post(setMoviegenres)

module.exports = movieRouter;