<script>
	import Combobox from '$lib/components/Combobox.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ImageSelector from '$lib/components/ImageSelector.svelte';
	import { createEventDispatcher } from 'svelte';

	/** @type {File} */
	let file;

	export let data = {
		email: '',
		name: '',
		phone: '',
		address: '',
		image: null,
		manager: null
	};

	export let button_label = 'Save';

	export let is_loading = false;

	const dispatch = createEventDispatcher();
</script>

<form on:submit|preventDefault={() => dispatch('submit', data)}>
	<div class="row g-3">
		<div class="col-md-6 vstack gap-3">
			<div>
				<label class="form-label" for="name">Name</label>
				<input class="form-control" type="text" id="name" required bind:value={data.name} />
			</div>
			<div>
				<label for="email" class="form-label">Email</label>
				<input class="form-control" type="email" id="email" required bind:value={data.email} />
			</div>
			<div>
				<label class="form-label" for="phone">Handynummer</label>
				<input class="form-control" type="text" id="phone" bind:value={data.phone} />
			</div>
			<div>
				<label class="form-label" for="address">Anschrift</label>
				<input id="address" class="form-control" type="text" bind:value={data.address} />
			</div>
		</div>
		<div class="col-md-6 d-flex flex-column">
			<label class="form-label" for="address">Bild</label>

			<div class="flex-grow-1">
				<ImageSelector bind:file />
			</div>

			<div class="form-text">
				Bitte beachten Sie, dass ausschließlich Dateien im PNG- oder JPG-Format akzeptiert werden.
				Die maximale Größe der Datei sollte 1200x1200 Pixel nicht überschreiten.
			</div>
		</div>
	</div>

	<div class="row mt-4">
		<div class="col">
			<Combobox
				label="Manager"
				name="manager"
				placeholder=""
				options={[
					{ text: 'Karim', email: 'karim@example.com', image: '', value: '1' },
					{ text: 'Ardit', email: 'ardit@example.com', image: '', value: '2' }
				]}
			>
				<div slot="option" let:option class="d-flex gap-3 align-items-center">
					<img
						src={option.image || '/images/profile-circle.svg'}
						alt=""
						style="width:3rem; height:3rem; border-radius:9999px"
					/>
					<div>
						<div style="font-weight: bold;">{option.text}</div>
						<div>{option.email}</div>
					</div>
				</div>
			</Combobox>
		</div>
	</div>

	<div class="row mt-4">
		<div class="col">
			<button class="btn btn-primary" disabled={is_loading}>
				{#if is_loading}
					<div class="spinner-border spinner-border-sm" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				{/if}
				{button_label}
			</button>
		</div>
	</div>
</form>
