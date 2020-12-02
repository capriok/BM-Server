import * as express from "express"
import * as io from 'socket.io'
import * as http from 'http'
import * as serverless from 'serverless-http'
import * as socket from './socket'
import * as cors from 'cors'
import { corsOptions, corsMiddleware } from './cors'

const app = express()
const server = http.createServer(app)

const port = process.env.PORT || 9000
const origins = ['http://localhost:3000', 'https://board-master.netlify.app', 'https://bm-server.herokuapp.com']

app.use(express.json())

app.use(cors(corsOptions(origins)), corsMiddleware)

app.use('/io', socket.router)

server.listen(port, () => console.log(`Server running on port ${port}`))

socket.initialize(io(server, {
	path: '/socket',
	origins: 'https://board-master.netlify.app',
	serveClient: false
}))

module.exports = app
module.exports.handler = serverless(app)