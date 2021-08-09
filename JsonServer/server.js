// https://github.com/typicode/json-server/issues/518

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use('/v1', router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

