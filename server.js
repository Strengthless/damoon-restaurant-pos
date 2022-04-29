require('dotenv').config()

const io = require('socket.io')(process.env.SOCKET_IO_PORT, {
	cors: {
		origin: '*',
	},
})

// const http = require('http')
// const fs = require('fs').promises

// const server = http.createServer(function (req, res) {
// 	fs.readFile(__dirname + '/index.html')
// 		.then((contents) => {
// 			res.setHeader('Content-Type', 'text/html')
// 			res.writeHead(200)
// 			res.end(contents)
// 		})
// 		.catch((err) => {
// 			res.writeHead(500)
// 			res.end(err)
// 			return
// 		})
// })

// server.listen(80, 'localhost', () => {
// 	console.log(`Server is running on http://${host}:${port}`)
// })

io.on('connection', (socket) => {
	console.log('A user has connected to the server!')
	socket.emit('connection-status', 'You have connected to our server!')

	socket.on('disconnect', (reason) => {
		console.log(`A user has disconnected due to "${reason}"...`)
	})

	socket.on('sync-request', () => {
		socket.broadcast.emit('sync-request', '')
	})
})
