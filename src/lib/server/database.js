/**
 * An array with all the bookings
 * @type {Booking[]}
 */
let bookings = [
	{
		id: crypto.randomUUID(),
		name: 'Mr White',
		startOnDay: new Date(2023, 2, 21),
		endOnDay: new Date(2023, 2, 29),
		color: 'primary'
	},
	{
		id: crypto.randomUUID(),
		name: 'Mr Green',
		startOnDay: new Date(2023, 2, 12),
		endOnDay: new Date(2023, 2, 21),
		color: 'secondary'
	},
	{
		id: crypto.randomUUID(),
		name: 'Mr Pink',
		startOnDay: new Date(2023, 3, 2),
		endOnDay: new Date(2023, 3, 12),
		color: 'tertiary'
	}
];

/**
 * It gets all th bookings from the database
 * @returns {Booking[]}
 */
export function getBookings() {
	return bookings;
}

/**
 * It adds a new booking to the database
 * @param {Booking} newBooking
 * @returns {void}
 */
export function addBooking(newBooking) {
	bookings = [...bookings, newBooking];
}

/**
 * It removes a booking, with matching id to the argumrent
 * @param {string} id
 * @returns {void}
 */
export function removeBooking(id) {
	bookings = bookings.filter((booking) => booking.id !== id);
}
