// @ts-ignore
import { writable, Writable } from 'svelte/store';

/**
 * My custom store for handling a few variables
 * @template T generic data to handle in store
 * @typedef {Writable<T>} WritableStore
 */

/** @module Store */
/**
 * Current year, the app will open on this year.
 * @type {WritableStore<number>}
 */
export const year = writable(new Date().getFullYear());

/**
 * If true the user can edit a booking
 * @type {Writable<boolean>}
 */
export let isEditable = writable(false);

/**
 * It defines wether the check in Input is on focus
 * @type {Writable<boolean>}
 */
export let checkInInputIsOnFocus = writable(false);

/**
 * It defines wether the check in Output is on focus
 * @type {Writable<boolean>}
 */
export let checkOutInputIsOnFocus = writable(false);

/**
 * It defines the color the booking gets on the calendar
 * @type {Writable<string>}
 */
export let borderColor = writable('');

/**
 * It defines the status of a booking
 * @type {Writable<{name:string, startOnDay:string, endOnDay:string, color:string}>}
 */
export let formStatus = writable({
	name: '',
	startOnDay: '',
	endOnDay: '',
	color: ''
});
