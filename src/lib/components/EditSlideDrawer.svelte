<!--
@component
## EditSlideDrawer.svelte

- This Component manages the editing slide drawer
- It uses the "ColorPicker" component
- It has a few methods and variables
-->

<script>
	import { enhance } from '$app/forms';

	import {
		checkInInputIsOnFocus,
		checkOutInputIsOnFocus,
		isEditable,
		borderColor,
		formStatus
	} from '../../stores/store.js';

	import ColorPicker from './ColorPicker.svelte';

	/**
	 * This is the value that gets written in the check-in input placeholder attribute
	 * @type {string}
	 */
	let checkInPlaceholder = 'check in';
	/**
	 * This is the value that gets written in the check-out input placeholder attribute
	 * @type {string}
	 */
	let checkOutPlaceholder = 'check out';

	/**
	 * It sets "checkInPlaceholder" to the string "pick a date ↓" and the "checkInInputIsOnFocus" store variable to true.
	 * @returns {void}
	 */
	function checkInInputOnFocus() {
		checkInPlaceholder = 'pick a date ↓';
		$checkInInputIsOnFocus = true;
	}

	/**
	 * It sets "checkInPlaceholder" back to the string "check in".
	 * @returns {void}
	 */
	function checkInInputFocusOut() {
		checkInPlaceholder = 'check in';
	}

	/**
	 * It sets "checkOutPlaceholder" to the string "pick a date ↓" and the "checkOutInputIsOnFocus" store variable to true.
	 * @returns {void}
	 */
	function checkOutInputOnFocus() {
		checkOutPlaceholder = 'pick a date ↓';
		$checkOutInputIsOnFocus = true;
	}

	/**
	 * It sets "checkOutPlaceholder" back to the string "check out".
	 * @returns {void}
	 */
	function checkOutInputFocusOut() {
		checkOutPlaceholder = 'check out';
	}

	/**
	 * It resets the drawer form values to empty strings
	 * @returns {void}
	 */
	function closeAndReset() {
		$borderColor = '';
		$formStatus.name = '';
		$formStatus.startOnDay = '';
		$formStatus.endOnDay = '';
		$formStatus.color = '';
		$isEditable = !$isEditable;
	}
</script>

<form method="POST" class="max-w-screen grid grid-cols-12 gap-4 p-4 backdrop-blur-md" use:enhance>
	<!-- Booking name -->
	<input
		type="text"
		name="bookingName"
		placeholder="name"
		autocomplete="off"
		class="input col-span-11"
		bind:value={$formStatus.name}
	/>

	<!-- close button -->

	<button type="button" on:click={() => closeAndReset()} class="col-span-1 text-2xl">X</button>

	<!-- Check in date -->
	<input
		type="text"
		name="check-in"
		autocomplete="off"
		placeholder={checkInPlaceholder}
		on:focus={checkInInputOnFocus}
		on:focusout={checkInInputFocusOut}
		class="input col-span-6"
		inputmode="none"
		value={$formStatus.startOnDay}
	/>

	<!-- Check out date -->
	<input
		type="text"
		name="check-out"
		placeholder={checkOutPlaceholder}
		autocomplete="off"
		on:focus={checkOutInputOnFocus}
		on:focusout={checkOutInputFocusOut}
		class="input col-span-6"
		inputmode="none"
		value={$formStatus.endOnDay}
	/>

	<!-- Color choice -->

	<div class="  col-span-9 row-start-3">
		<input type="hidden" name="bookingColor" value={$borderColor} />
		<ColorPicker />
	</div>

	<!-- Submit button -->
	<button
		type="submit"
		on:click={() => {
			$isEditable = !$isEditable;
		}}
		class="variant-filled btn btn-sm col-span-3 h-8 w-8 self-center justify-self-center px-8 py-6 text-lg"
		>save</button
	>
</form>

<style>
	input::-webkit-calendar-picker-indicator {
		display: none;
	}
</style>
