$(function () {
	// Enable the snapping of receipts to its corresponding table.
	$('.table').droppable({
		drop: function (event, ui) {
			snapToMiddle(ui.draggable, $(this), 400)
			ui.draggable.data('table', $(this).attr('id'))
			console.log('potentially call a sync request?')
			updateTableColor()
		},
	})
	// Enable discarding of receipts.
	$('.large-bin').droppable({
		drop: function (event, ui) {
			// Possible implementation of cooler confirmation dialog: https://api.jqueryui.com/dialog/#option-buttons
			// This shit needs further tuning for the aesthetics...

			// $( "#dialog-confirm" ).dialog({
			// 	resizable: false,
			// 	height: "auto",
			// 	width: 400,
			// 	modal: true,
			// 	draggable: false,
			// 	buttons: {
			// 	  "閂就閂啦柒頭": function() {
			// 		$( this ).dialog( "close" );
			// 	  },
			// 	  "取消": function() {
			// 		$( this ).dialog( "close" );
			// 	  }
			// 	}
			//   });

			if (!confirm('你確認要刪除此訂單嗎？此動作將不可復原。')) {
				ui.draggable.animate(ui.draggable.data().origPosition, 400)
				return
			}
			ui.draggable.data('table', 'discard')
			updateTableColor()
			ui.draggable.effect('size', { origin: ['middle', 'center'] }, 600)
			setTimeout(() => {
				ui.draggable[0].remove()
			}, 550)
			console.log('potentially call a sync request?')
		},
		create: function () {
			$(this).hide()
		},
		over: function (event, ui) {
			$(ui.draggable).stop()
			$(ui.draggable).animate({ opacity: '1' }, 10)
		},
		out: function (event, ui) {
			$(ui.draggable).stop()
			$(ui.draggable).animate({ opacity: '0.7' }, 10)
		},
	})
})

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

// Declares an instant toggle function for DOM elements.
$.fn.quicktoggle = function () {
	this.each(function () {
		var $this = $(this)
		if ($this.is(':visible')) {
			$this.hide()
		} else {
			$this.show()
		}
	})
	return this
}

function newReceipt(receiptID, tableID) {
	// Create a new receipt
	$(`.receipts`).append(
		`<div class='receipt' id='${receiptID}' status='empty-order'></div>`
	)
	$('.receipt').draggable({
		opacity: 0.7,
		revert: 'invalid',
		containment: 'window',
		scroll: false,
		create: function (event, ui) {
			$(this).data('position', $(this).position())
			// Snaps the receipt to middle upon creation.
			$(this).position({
				my: 'center',
				at: 'center',
				of: '#' + tableID,
			})
			setTimeout(() => {
				$(this).simulate('drag-n-drop', { dx: 1 })
			}, 5)
			// Event listener for receipt click
			$('.receipt').click(function () {
				showOrderDetails('dine-in', $(this).attr('id'))
			})
		},
		// Toggles the bin when receipt is dragged.
		start: function () {
			$(this).stop(true, true)
			// Possible implementation of animation: https://stackoverflow.com/questions/29625037/can-i-transition-the-flex-grow-of-a-flex-box-to-produce-an-animation
			$('.toggle1').quicktoggle()
			$('.toggle2').quicktoggle()
			// Saves original position data for a possible revert call in the future.
			$(this).data('origPosition', $(this).position())
		},
		stop: function () {
			$('.toggle1').quicktoggle()
			$('.toggle2').quicktoggle()
		},
	})
}

// Snap receipts to the middle of the containers.
function snapToMiddle(dragger, target, time) {
	// 0.06 to avoid blocking the table number for smaller tables
	if (target[0].className.includes('large')) {
		var topMove =
			target.position().top -
			dragger.data('position').top +
			(target.outerHeight(true) - dragger.outerHeight(true)) / 2
	} else {
		var topMove =
			target.position().top -
			dragger.data('position').top +
			(target.outerHeight(true) - dragger.outerHeight(true)) / 2 +
			target.outerHeight(true) * 0.12
	}
	var leftMove =
		target.position().left -
		dragger.data('position').left +
		(target.outerWidth(true) - dragger.outerWidth(true)) / 2 -
		target.outerWidth(true) * 0.02

	dragger.animate(
		{ top: topMove, left: leftMove },
		{ duration: time, easing: 'easeOutBack' }
	)
}
