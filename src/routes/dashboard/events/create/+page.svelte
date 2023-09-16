<script>
	import EventForm from '../EventForm.svelte';

	import { is_loading, events } from '$lib/stores/firebase.js';
	import { goto } from '$app/navigation';

	async function on_submit(e) {
		await events.create(e.detail);
		goto('/dashboard/events');
	}
</script>

<div class="card border-0 shadow-sm">
	<div class="card-body">
		<div class="d-flex justify-content-between align-items-baseline mb-4">
			<h1 class="fs-5">Kalendareintrag erstellen</h1>
		</div>

		<EventForm on:submit={on_submit} is_loading={$is_loading} button_label="Erstellen" />
	</div>
</div>
