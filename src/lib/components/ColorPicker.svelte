<!--
@component
## ColorPicker.svelte

- This Component allows picking a color when registering a booking.
- It uses the "borderColor" variable from the store and local variable "active"
- It has a function that handles the selection of a colour from a palette
-->

<script>
	import { borderColor } from '../../stores/store.js';

	/**
	 *Local variable to determine wich colour is active
	 *@type {string}
	 */
	let active = '';

	/**
	 * @typedef {object} MouseEvent
	 */

	/**
	 * On click it defines which color gets selected
	 * @param {MouseEvent} e - The event object
	 */
	function handleClick(e) {
		active = e.target.id;
		$borderColor = e.target.id;
	}
</script>

<div class="mt-2 rounded-lg p-2">
	<!-- palette-of-colors -->
	<div class=" overflow-x-auto whitespace-nowrap">
		<!-- single color -->
		<button
			id="secondary"
			type="button"
			class="mr-2 inline-block h-10 w-10 rounded-full bg-secondary-500 transition-all"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'secondary'}
		/>
		<button
			id="primary"
			type="button"
			class="mr-2 inline-block h-10 w-10 rounded-full bg-primary-500"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'primary'}
		/>
		<button
			id="tertiary"
			type="button"
			class="mr-2 inline-block h-10 w-10 rounded-full bg-tertiary-500"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'tertiary'}
		/>
		<button
			id="success"
			type="button"
			class="mr-2 inline-block h-10 w-10 rounded-full bg-success-500"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'success'}
		/>
		<button
			id="warning"
			type="button"
			class="mr-2 inline-block h-10 w-10 rounded-full bg-warning-500"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'warning'}
		/>
		<button
			id="error"
			type="button"
			class="mr-2 inline-block h-10 w-10 rounded-full bg-error-500"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'error'}
		/>
		<button
			id="surface"
			type="button"
			class="mr-2 inline-block h-10 w-10 rounded-full bg-surface-500"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'surface'}
		/>
		<button
			id="primaryToken"
			type="button"
			class="bg-primary-800-100-token mr-2 inline-block h-10 w-10 rounded-full"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'primaryToken'}
		/>
		<button
			id="secondaryToken"
			type="button"
			class="bg-secondary-800-100-token mr-2 inline-block h-10 w-10 rounded-full"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'secondaryToken'}
		/>
	</div>
</div>

<style>
	.is-selected {
		animation: wobble 0.5s ease-in-out;
		border-radius: 1px;
	}

	@keyframes wobble {
		50% {
			border-radius: 10px;
		}
		100% {
			border-radius: 1px;
		}
	}
</style>
