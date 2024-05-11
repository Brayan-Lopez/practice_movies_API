const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Actor = require('./Actor');
const Director = require('./Director');
const Genre = require('./Genre');

const Movie = sequelize.define('movie', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    synopsis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

Movie.belongsToMany(Actor, {through: 'movies_actors'})
Actor.belongsToMany(Movie, {through: 'movies_actors'})

Movie.belongsToMany(Director, {through: 'movies_directors'})
Director.belongsToMany(Movie, {through: 'movies_directors'})

Movie.belongsToMany(Genre, {through: 'movies_genres'})
Genre.belongsToMany(Movie, {through: 'movies_genres'})

module.exports = Movie;