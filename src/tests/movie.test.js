const request = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')

let id

test('GET /movies debe traer todos las películas', async()=>{
  const res = await request(app).get('/movies')
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array)
})

test('POST /movies debe crear una película', async()=>{
  const newMovie = {
    name:'nombre ejemplo',
    image:'imageURL',
    synopsis:'synopsis de ejemplo',
    releaseYear:2000
  }
  const res = await request(app).post('/movies').send(newMovie)
  id = res.body.id
  expect(res.status).toBe(201)
  expect(id).toBeDefined()
  expect(res.body.name).toBe(newMovie.name)
})

test('put /movies/:id debe actualizar los datos de una película', async()=>{
  const updatedMovie = {
    name:'nombre ejemplo Acualizado'

  }
  const res = await request(app).put(`/movies/${id}`).send(updatedMovie)
  expect(res.status).toBe(200)
  expect(res.body.name).toBe(updatedMovie.name)
})

test('POST /movies/:id/actors debe insertar los actores de una película', async () => {
  const actor = await Actor.create({
    firstName:'nombre ejemplo',
    lastName:'apellido ejemplo',
    nationality:'colombia',
    image:'imageURL',
    birthday:'1997-07-01'
  })
  const res = await request(app).post(`/movies/${id}/actors`).send([actor.id])
  await actor.destroy()
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array)
  expect(res.body.length).toBe(1)
});

test('POST /movies/:id/directors debe insertar los directores de una película', async () => {
  const director = await Director.create({
    firstName:'nombre ejemplo',
    lastName:'apellido ejemplo',
    nationality:'colombia',
    image:'imageURL',
    birthday:'1997-07-01'
  })
  const res = await request(app).post(`/movies/${id}/directors`).send([director.id])
  await director.destroy()
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array)
  expect(res.body.length).toBe(1)
});

test('POST /movies/:id/genres debe insertar los géneros de una película', async () => {
  const genre = await Genre.create({
    name:'nombre ejemplo'
  })
  const res = await request(app).post(`/movies/${id}/genres`).send([genre.id])
  await genre.destroy()
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array)
  expect(res.body.length).toBe(1)
});

test('DELETE /movies/:id debe borrar una película por medio del id', async()=>{
  const res = await request(app).delete(`/movies/${id}`)
  expect(res.status).toBe(204)
})