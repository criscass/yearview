<script>
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.pcss';

	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import YearButtons from '$lib/components/YearButtons.svelte';
	import { year, isEditable } from '../stores/store.js';

	import { scale } from 'svelte/transition';

	/**
	 * It decreseas by 1 the store variable "year"
	 */
	function prevYear() {
		$year = $year - 1;
	}
	/**
	 * It increases by 1 the store variable "year"
	 */
	function nextYear() {
		$year = $year + 1;
	}
</script>

<!-- App shell skeletonUI component -->

<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<strong class="text-sm uppercase">La Civettaia</strong>
			</svelte:fragment>

			<YearButtons on:prevYear={prevYear} on:nextYear={nextYear} />

			<svelte:fragment slot="trail">
				{#if !$isEditable}
					<button
						transition:scale|global={{ duration: 300 }}
						type="button"
						on:click={() => ($isEditable = !$isEditable)}
						class="variant-filled-surface btn btn-sm rounded-2xl text-sm">+</button
					>
				{/if}

				<LightSwitch width="w-12" height="h-6" />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->

	<slot />
</AppShell>
