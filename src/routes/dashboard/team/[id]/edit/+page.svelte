<script>
	import EmployeeForm from '../../EmployeeForm.svelte';
	import { is_loading, users } from '$lib/stores/firebase.js';
	import { page } from '$app/stores';

	async function on_submit(e) {
		await users.update($page.params.id, e.detail);
	}
</script>

{#await users.get($page.params.id) then _}
	<div class="card border-0 shadow-sm">
		<div class="card-body">
			<div class="d-flex justify-content-between align-items-baseline mb-4">
				<h1 class="fs-5">Mitarbeiter bearbeiten</h1>
			</div>

			<EmployeeForm
				user={$users.user}
				on:submit={on_submit}
				button_label={$is_loading ? 'Einen Moment...' : 'Speichern'}
			/>
		</div>
	</div>
{/await}
