require('dotenv').config()

const io = require('socket.io')(process.env.SOCKET_IO_PORT, {
	cors: {
		origin: '*',
	},
})

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
