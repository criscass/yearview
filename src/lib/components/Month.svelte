<script>
	import calendify from '$lib/functions/calendify';
	import {
		year,
		isEditable,
		checkInInputIsOnFocus,
		checkOutInputIsOnFocus,
		formStatus
	} from '../../stores/store';
	export let month = 0; /**January*/

	// - - - - props for today day higligthing  - - - -
	// export const today: Date | null = null; // Todays Date
	// export let today_day = 0;
	// export let today_year = 0;
	// export let today_month = 0;

	/**
	 * datas coming from the "/" +page.svelte component
	 * @type {*}
	 */
	export let data;

	/**
	 * @type {Booking[]}
	 */
	$: bookings = data.bookings;

	/**
	 * Week names array
	 * @type {string[]}
	 */
	export let labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	/**
	 * The months names
	 * @type {string[]}
	 */
	// prettier-ignore
	export const months = [ 'Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'
	];

	/**
	 * SkeletonUI colors for bookings display
	 * @type {BorderColor}
	 */
	const borderColor = {
		primary: 'border-b-4 border-primary-500',
		primaryToken: 'border-b-4 border-primary-800-100-token',
		secondary: 'border-b-4 border-secondary-500',
		secondaryToken: 'border-b-4 border-secondary-800-100-token',
		tertiary: 'border-b-4 border-tertiary-500',
		success: 'border-b-4 border-success-500',
		warning: 'border-b-4 border-warning-500',
		error: 'border-b-4 border-error-500',
		surface: 'border-b-4 border-surface-500'
	};

	/**Month array for prev, current and next month*/
	$: prev = calendify(new Date($year, month - 1), bookings);
	$: current = calendify(new Date($year, month), bookings);
	$: next = calendify(new Date($year, month + 1), bookings);

	// Returns true if year, month and day corrisponds to todays date
	// function isToday(day: number) {
	// 	return (
	// 		today &&
	// 		today_year === $year &&
	// 		today_month === month &&
	// 		today_day === day
	// 	);
	// }

	/**
	 * Updates the formStatus.startOnDay and formStatus.endOnDay store variables
	 * this variables are used when making or editing a booking
	 * @param {number} year
	 * @param {number} month
	 * @param {number} day
	 * @returns {void}
	 */
	function dayPicked(year, month, day) {
		if ($checkInInputIsOnFocus) {
			$formStatus.startOnDay = `${months[month]}/${day}/${year}`;

			$checkInInputIsOnFocus = false;
		}
		if ($checkOutInputIsOnFocus) {
			$formStatus.endOnDay = `${months[month]}/${day}/${year}`;
			$checkOutInputIsOnFocus = false;
		}
	}

	// const options = {
	// 	weekday: 'narrow',
	// 	year: 'numeric',
	// 	month: 'long',
	// 	day: 'numeric'
	// };

	/**
	 * Updates the store values, only on booked days,
	 * and runs the dayPicked function for all days
	 * @param {number} year
	 * @param {number} month
	 * @param {number} dayNumber
	 * @param {boolean} isBooked
	 * @param {string} [name]
	 * @param {Date} [startOnDay]
	 * @param {Date} [endOnDay]
	 * @return {void}
	 */
	function handleClicks(year, month, dayNumber, isBooked, name, startOnDay, endOnDay) {
		$isEditable ? dayPicked(year, month, dayNumber) : null;

		isBooked ? ($isEditable = true) : null;
		if (isBooked) {
			$formStatus.name = name;
			startOnDay && ($formStatus.startOnDay = startOnDay.toLocaleDateString());
			endOnDay && ($formStatus.endOnDay = endOnDay.toLocaleDateString());
		}
	}
</script>

<div class="card variant-soft px-4 py-4">
	<header class="card-header mb-2 pt-2">
		<h4 class="unstyled text-2xl">{months[month]}</h4>
	</header>

	<section class="grid grid-cols-7 gap-4 text-center text-lg">
		<!-- Renders the week days labels array-->
		{#each labels as txt, idx (txt)}
			<span>{labels[idx % 7]}</span>
		{/each}
		<!-- Renders the Days Array-->
		{#each { length: 6 } as _, idxw (idxw)}
			{#if current[idxw]}
				{#each { length: 7 } as _, idxd (idxd)}
					{@const day = current[idxw][idxd]}

					<!-- It starts from the first day of the month, not printing the days of the week at the beginning or at the end of the month, those are in fact numbers and not objects, which belong to the previous or next month  -->

					<!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
					// Symplify this ↓ by getting startOnDay and endOnDay directly as
					dates, from the value in the object and then converting it to locale format string in the form. -->

					{#if typeof day === 'object'}
						<div
							on:click={() => {
								handleClicks(
									$year,
									month,
									day.dayNumber,
									day.isBooked,
									day.name1,
									day.startOnDay,
									day.endOnDay
								);
							}}
							on:keydown={() => {
								handleClicks(
									$year,
									month,
									day.dayNumber,
									day.isBooked,
									day.name1,
									day.startOnDay,
									day.endOnDay
								);
							}}
							class:day={$isEditable || day.isBooked}
						>
							<span>
								{day.dayNumber}
							</span>
							{#if day.color2}
								<div class="grid grid-cols-2">
									<div class={`${borderColor[`${day.color2}`]}`} />
									<div class={`${borderColor[`${day.color1}`]}`} />
								</div>
							{:else if day.color1}
								<div class={day.color1 === '' ? '' : `${borderColor[`${day.color1}`]}`} />
							{/if}
						</div>
					{:else if idxw < 1}
						{@const prevDay = prev[prev.length - 1][idxd]}
						{#if typeof prevDay === 'object'}
							<span class="opacity-0">{prevDay.dayNumber}</span>
						{/if}
					{:else}
						{@const nexDay = next[0][idxd]}
						{#if typeof nexDay === 'object'}
							<span class="opacity-0">{nexDay.dayNumber}</span>
						{/if}
					{/if}
				{/each}
			{/if}
		{/each}
	</section>
</div>

<style>
	.day {
		cursor: pointer;
	}
	.day:hover {
		transform: scale(1.2);
		color: white;
	}
</style>
