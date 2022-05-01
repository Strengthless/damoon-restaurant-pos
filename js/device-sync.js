const socket = io(`http://128.199.204.7:3000`)

// Check for connection status
socket.on('connection-status', () => {
	console.log('You have connected to the server!')
})

// Automatically reconnects to the server upon disconection.
socket.on('disconnect', () => {
	console.log(
		'You have disconnected from the server! Attempting to reconnect now...'
	)
	socket.connect()
})

// This handles sync-requests from the server.
socket.on('sync-request', (type) => {
	console.log('Sync requested by another device!')
	// Do something...
	switch (type) {
		case 'dine-in':
			break
		case 'takeaway':
			break
	}
})

// Function to send sync request to the server.
function sendSyncRequest(type) {
	// The parameter 'type' accepts 'dine-in', 'takeaway'.
	socket.emit('sync-request', type)
}

function updateDinein() {}

function updateTakeaway() {}

function updateCustomer() {}
