// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
require('dotenv').config()
const cors = require("cors")

server.use(cors())
server.use(middlewares)

server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
  console.log(process.env.TESTING);

})