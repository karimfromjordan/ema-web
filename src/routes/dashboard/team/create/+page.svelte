<script>
	import EmployeeForm from '../EmployeeForm.svelte';

	import { is_loading, users } from '$lib/stores/firebase.js';
	import { goto } from '$app/navigation';

	async function on_submit(e) {
		await users.create(e.detail);
		goto('/dashboard/team');
	}
</script>

<div class="card border-0 shadow-sm">
	<div class="card-body">
		<div class="d-flex justify-content-between align-items-baseline mb-4">
			<h1 class="fs-5">Mitarbeiter erstellen</h1>
		</div>

		<EmployeeForm on:submit={on_submit} is_loading={$is_loading} button_label="Erstellen" />
	</div>
</div>
