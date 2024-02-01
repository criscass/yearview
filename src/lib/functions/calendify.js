//*************************************************************/
// Calendify creates a month, which consists of
// an array of weeks arrays.
// Each week array contains either a number
// ( at the beginning or at the end of the month, representing the first or last days
// of the week that belong to the previous or next month ) or an object of type Day,
//  ( representing a day ) which contains all needed informations for unbooked
// and booked days
//*************************************************************/

/**
 * Calendify is the main app function that creates all the day as object with all needed informations
 * @param {Date} date - The date where to start creating the weeks
 * @param {Booking[]} bookings - The bookings array
 * @returns {Day | number[][]} - Returns an array of week arrays. Each week array contains Day objects or numbers.
 */
export default function (date, bookings) {
	/**
	 * Counter variable used in the loops
	 * @type {number}
	 */
	let i = 0;

	/**
	 * Second Counter variable used in the loops
	 * @type {number}
	 */
	let j = 0;

	/**
	 * Array of Day objects rapresenting a week(A number, instead of a Day, in case at the end or beginning of a month).
	 * @type {Day | number[]}
	 */
	let week = [];

	/**
	 * Array of week arrays.
	 * @type {Day | number[][]}
	 */
	const out = [];

	/**
	 * the year related to the date parameter
	 * @type {number}
	 */
	const year = date.getFullYear();

	/**
	 * the month related to the date parameter: 0 is January
	 * @type {number}
	 */
	const month = date.getMonth();

	/**
	 * day of the week (0 = sunday and 6 = saturday) for the current date
	 * @type {number}
	 */
	let first = new Date(year, month, 1).getDay();

	/**
	 * Amount of days in the month
	 * @type {number}
	 */
	const days = new Date(year, month + 1, 0).getDate();

	/**Loops trough all the days of the month */
	while (i < days) {
		for (j = 0, week = Array(7); j < 7; ) {
			while (j < first) week[j++] = 0;

			if (++i > days) {
				week[j++] = 0;
			} else {
				/**
				 * The current date
				 * @type {Date}
				 */
				const today = new Date(year, month, i);

				/**
				 * todayBookings would rappresent the eventual bookings for the day
				 * if there is no booking it's an empty []
				 * @type {Booking[]}
				 */
				const todayBookings = bookings.filter(
					(booking) =>
						booking.startOnDay.valueOf() <= today.valueOf() &&
						today.valueOf() <= booking.endOnDay.valueOf()
				);
				/**Checking that the day is not a zero */
				if (week[j] != 0) {
					/**Assigns different colors to different bookings in case there are more the one*/
					if (todayBookings.length === 1) {
						week[j++] = {
							dayNumber: i,
							color1: todayBookings[0].color,
							isBooked: true,
							name1: todayBookings[0].name,
							startOnDay: todayBookings[0].startOnDay,
							endOnDay: todayBookings[0].endOnDay
						};
					} else if (todayBookings.length === 2) {
						week[j++] = {
							dayNumber: i,
							color1: todayBookings[0].color,
							color2: todayBookings[1].color,
							isBooked: true,
							name1: todayBookings[0].name,
							name2: todayBookings[1].name,
							startOnDay: todayBookings[0].startOnDay,
							endOnDay: todayBookings[0].endOnDay
						};
					} else {
						week[j++] = {
							dayNumber: i,
							isBooked: false
						};
					}
				}
			}
			first = 0;
		}
		out.push(week);
	}

	return out;
}
