<script>
	import ShopForm from '../ShopForm.svelte';

	import { is_loading, shops } from '$lib/stores/firebase.js';
	import { goto } from '$app/navigation';

	async function on_submit(e) {
		await shops.create(e.detail);
		goto('/dashboard/shops');
	}
</script>

<div class="card border-0 shadow-sm">
	<div class="card-body">
		<div class="d-flex justify-content-between align-items-baseline mb-4">
			<h1 class="fs-5">Filiale erstellen</h1>
		</div>

		<ShopForm on:submit={on_submit} button_label={$is_loading ? 'Einen Moment...' : 'Erstellen'} />
	</div>
</div>
