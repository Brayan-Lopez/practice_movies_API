const request = require('supertest')
const app = require('../app')

let id

test('GET /actors debe traer todos los actores', async()=>{
  const res = await request(app).get('/actors')
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array)
})

test('POST /actors debe crear un actor', async()=>{
  const newActor = {
    firstName:'nombre ejemplo',
    lastName:'apellido ejemplo',
    nationality:'colombia',
    image:'imageURL',
    birthday:'1997-07-01'
  }
  const res = await request(app).post('/actors').send(newActor)
  id = res.body.id
  expect(res.status).toBe(201)
  expect(id).toBeDefined()
  expect(res.body.firstName).toBe(newActor.firstName)
})

test('put /actors/:id debe actualizar los datos de un actor', async()=>{
  const updatedActor = {
    firstName:'nombre ejemplo Acualizado'
  }
  const res = await request(app).put(`/actors/${id}`).send(updatedActor)
  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(updatedActor.firstName)
})

test('DELETE /actors/:id debe borrar un actor por medio del id', async()=>{
  const res = await request(app).delete(`/actors/${id}`)
  expect(res.status).toBe(204)
})