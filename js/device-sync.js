const socket = io(`http://128.199.204.7:3000`)

var dev = 0

// Check for connection status
socket.on('connection-status', () => {
	// if (dev == 1) {
	// 	document.location.reload()
	// }
	console.log('You have connected to the server!')
	dev++
})

// Automatically reconnects to the server upon disconection.
socket.on('disconnect', () => {
	console.log(
		'You have disconnected from the server! Attempting to reconnect now...'
	)
	socket.connect()
})

// This handles sync-requests from the server.
socket.on('sync-request', () => {
	console.log('Sync requested by another device!')
	// Do something...
})

// Function to send sync request to the server.
function sendSyncRequest() {
	socket.emit('sync-request', '')
}

// Updates table color according to the GUI location.
function updateTableColor() {
	$('.table').css('background-color', 'var(--dark-gray)')
	$('.receipt').each(function () {
		if ($(this).data().table == 'discard') return
		$(`#${$(this).data().table}`).css(
			'background-color',
			`var(--${$(this).attr('status')})`
		)
	})
}
