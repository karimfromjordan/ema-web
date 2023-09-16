<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '$lib/components/Icon.svelte';
	import ImageSelector from '$lib/components/ImageSelector.svelte';
	import { createEventDispatcher } from 'svelte';

	export let user = {
		email: '',
		name: '',
		phone: '',
		address: '',
		born_at: null,
		position: 'Verkäufer',
		form_of_employment: 'Vollzeit',
		holidays_per_year: 20,
		profile_image: null,
		default_store: null
	};

	export let button_label = 'Save';
	export let is_loading = false;

	/** @type {File} */
	let file;

	const dispatch = createEventDispatcher();

	function on_submit(event) {
		dispatch('submit', user);
	}
</script>

<form on:submit|preventDefault={on_submit}>
	<div class="row g-3">
		<div class="col-md-6 vstack gap-3">
			<div>
				<label class="form-label" for="name">Name</label>
				<input class="form-control" type="text" id="name" required bind:value={user.name} />
			</div>
			<div>
				<label for="email" class="form-label">Email</label>
				<input class="form-control" type="email" id="email" required bind:value={user.email} />
			</div>
			<div>
				<label class="form-label" for="phone">Handynummer</label>
				<input class="form-control" type="text" id="phone" bind:value={user.phone} />
			</div>
			<div>
				<label class="form-label" for="address">Anschrift</label>
				<input id="address" class="form-control" type="text" bind:value={user.address} />
			</div>
			<div>
				<label class="form-label" for="address">Geburtsdatum</label>
				<input id="birthday" class="form-control" type="date" bind:value={user.born_at} />
			</div>
		</div>

		<div class="col-md-6 d-flex flex-column">
			<label class="form-label" for="address">Profilbild</label>

			<div class="flex-grow-1">
				<ImageSelector bind:file />
			</div>

			<div class="form-text">
				Bitte beachten Sie, dass ausschließlich Dateien im PNG- oder JPG-Format akzeptiert werden.
				Die maximale Größe der Datei sollte 1200x1200 Pixel nicht überschreiten.
			</div>
		</div>
	</div>

	<div class="row g-3 mt-4">
		<div class="col-md-6">
			<label class="form-label" for="position">Position</label>
			<select class="form-select" id="position" bind:value={user.position}>
				<option value="Manager">Manager</option>
				<option value="Verkäufer">Verkäufer</option>
				<option value="Azubi">Azubi</option>
				<option value="Entwickler">Entwickler</option>
			</select>
		</div>
		<div class="col-md-6">
			<label class="form-label" for="default_store">Filiale</label>

			<select bind:value={user.default_store} id="default_store" class="form-select">
				<option value="" />
				{#each [] as shop}
					<option value={shop.uid}>{shop.name}</option>
				{/each}
			</select>
		</div>
		<div class="col-md-6">
			<label class="form-label" for="form_of_employment">Arbeitszeit</label>
			<select id="form_of_employment" class="form-select" bind:value={user.form_of_employment}>
				<option value="Vollzeit">Vollzeit</option>
				<option value="Teilzeit">Teilzeit</option>
				<option value="Minijob">Minijob</option>
			</select>
		</div>
		<div class="col-md-6">
			<label class="form-label" for="holidaysPerYear">Urlaubstage</label>
			<input
				bind:value={user.holidays_per_year}
				class="form-control"
				type="number"
				name="holidaysPerYear"
				id="holidaysPerYear"
			/>
		</div>
	</div>

	<div class="row mt-4">
		<div class="col">
			<button class="btn btn-primary" disabled={is_loading}>
				{#if is_loading}
					<div class="spinner-border spinner-border-sm" role="status">
						<span class="visually-hidden">Einen Moment...</span>
					</div>
				{/if}
				{button_label}
			</button>
		</div>
	</div>
</form>
