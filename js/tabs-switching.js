$(function () {
	// Tab switching implementation
	$('.items li a').click(function () {
		var t = $(this).attr('id')

		if ($(this).hasClass('inactive')) {
			$('.items li a').addClass('inactive')
			$(this).removeClass('inactive')

			$('.container').hide()
			$('.receipts').hide()
			$('[id="' + t + 'C"]').show()
		}
	})

	// Hide other tabs
	$('.container').hide()
	$('#order-info').hide()
	$('[id="dineinC"]').show()

	// Assign the corresponding number to all tables.
	$('.table p').each(function () {
		$(this).append($(this).parent().attr('id'))
	})

	// Enable the clicking of plus signs.
	var receiptCount = 1
	$('.plus-sign').click(function () {
		newReceipt(receiptCount, $(this).prev().text())
		receiptCount += 1
	})

	// Lock to landscape orientation
	screen.orientation.lock('landscape')
})

function showOrderDetails(type, id) {
	console.log('a receipt is clicked:', type, id)
	$('#order-info').show()
	switch (type) {
		case 'dine-in':
			// fetch from dine-in database
			break
		case 'takeaway':
			// fetch from order-info database
			break
	}
	// show the order-info DOM element.
}
