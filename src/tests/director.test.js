const request = require('supertest')
const app = require('../app')

let id

test('GET /directors debe traer todos los directores', async()=>{
  const res = await request(app).get('/directors')
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array)
})

test('POST /directors debe crear un director', async()=>{
  const newDirector = {
    firstName:'nombre ejemplo',
    lastName:'apellido ejemplo',
    nationality:'colombia',
    image:'imageURL',
    birthday:'1997-07-01'
  }
  const res = await request(app).post('/directors').send(newDirector)
  id = res.body.id
  expect(res.status).toBe(201)
  expect(id).toBeDefined()
  expect(res.body.firstName).toBe(newDirector.firstName)
})

test('put /directors/:id debe actualizar los datos de un director', async()=>{
  const updatedDirector = {
    firstName:'nombre ejemplo Acualizado'
  }
  const res = await request(app).put(`/directors/${id}`).send(updatedDirector)
  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(updatedDirector.firstName)
})

test('DELETE /directors/:id debe borrar un director por medio del id', async()=>{
  const res = await request(app).delete(`/directors/${id}`)
  expect(res.status).toBe(204)
})