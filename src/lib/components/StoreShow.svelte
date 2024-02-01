<!--
@component
## StoreShow.svelte

- This is a service Component that should be hidden in production.render
- It shows a bunch of store datas and database data
-->

<script>
	import {
		year,
		isEditable,
		checkInInputIsOnFocus,
		checkOutInputIsOnFocus,
		borderColor,
		formStatus
	} from '../../stores/store';

	/**
	 * Local variable with lots of informative datas from the database
	 * @type
	 */
	export let data;

	$: bookings = data.bookings;
</script>

<div class="p-12">
	<h1 class="unstyled">Store</h1>

	<h3 class="mt-4">Year:<span class="mx-4 text-red-600">{$year}</span></h3>
	<h3 class="mt-4">
		isEditable:<span class="mx-4 text-red-600">{$isEditable}</span>
	</h3>
	<h3 class="mt-4">
		checkInInputIsOnFocus:<span class="mx-4 text-red-600">{$checkInInputIsOnFocus}</span>
	</h3>
	<h3 class="mt-4">
		checkOutInputIsOnFocus:<span class="mx-4 text-red-600">{$checkOutInputIsOnFocus}</span>
	</h3>
	<h3 class="mt-4">
		borderColor:<span class="mx-4 text-red-600">{$borderColor}</span>
	</h3>
	<div class="mt-8 p-4">
		<h2>formStatus</h2>
		<div class="ml-4">
			<h3 class="mt-4">
				formStatus.name:<span class="mx-4 text-red-600">{$formStatus.name}</span>
			</h3>
			<h3 class="mt-4">
				formStatus.startOnDay:<span class="mx-4 text-red-600">{$formStatus.startOnDay}</span>
			</h3>
			<h3 class="mt-4">
				formStatus.endOnDay:<span class="mx-4 text-red-600">{$formStatus.endOnDay}</span>
			</h3>
			<h3 class="mt-4">
				formStatus.color:<span class="mx-4 text-red-600">{$formStatus.color}</span>
			</h3>
		</div>
	</div>
</div>
<div>
	<pre>
  {JSON.stringify(bookings, null, 4)}
</pre>
</div>

<style>
	h1 {
		font-size: 3rem;
	}
</style>
