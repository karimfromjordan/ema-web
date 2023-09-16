<script>
	import ShopForm from '../../ShopForm.svelte';
	import { is_loading, shops } from '$lib/stores/firebase.js';
	import { page } from '$app/stores';

	async function on_submit(e) {
		await shops.update($page.params.id, e.detail);
	}
</script>

{#await shops.get($page.params.id) then _}
	<div class="card border-0 shadow-sm">
		<div class="card-body">
			<div class="d-flex justify-content-between align-items-baseline mb-4">
				<h1 class="fs-5">Filiale bearbeiten</h1>
			</div>

			<ShopForm
				on:submit={on_submit}
				data={$shops.shop}
				button_label={$is_loading ? 'Einen Moment...' : 'Speichern'}
			/>
		</div>
	</div>
{/await}
