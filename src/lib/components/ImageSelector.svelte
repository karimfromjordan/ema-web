<script>
	import Icon from './Icon.svelte';

	/** @type {string | undefined} */
	export let image = undefined;

	/** @type {string | undefined} */
	export let form = undefined;

	/** @type {File | undefined} */
	export let file = undefined;

	const id = crypto.randomUUID();

	function drag(node, { cb }) {
		function preventDefaults(e) {
			e.preventDefault();
			e.stopPropagation();
		}

		function highlight(e) {
			node.classList.add('highlight');
		}

		function unhighlight(e) {
			node.classList.remove('highlight');
		}

		function handle_drop(e) {
			const data_transfer = e.dataTransfer;
			const file = data_transfer.files[0];

			handle_file(file);
		}

		function handle_change(e) {
			handle_file(e.target.files[0]);
		}

		function handle_file(file) {
			preview_image(file);
			cb(file);
		}

		function preview_image(file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				image = reader.result;
			};
		}

		['dragenter', 'dragover', 'dragleave', 'drop'].forEach((event_name) => {
			node.addEventListener(event_name, preventDefaults, false);
		});

		['dragenter', 'dragover'].forEach((event_name) => {
			node.addEventListener(event_name, highlight, false);
		});

		['dragleave', 'drop'].forEach((event_name) => {
			node.addEventListener(event_name, unhighlight, false);
		});

		node.addEventListener('drop', handle_drop, false);
		node.addEventListener('change', handle_change, false);
	}

	function clear() {
		image = undefined;
		file = undefined;
	}
</script>

<div class="h-100 d-flex flex-column gap-3">
	<div
		class="flex-grow-1 position-relative p-3 border border-3 rounded d-flex flex-column justify-content-center align-items-center gap-3 bg-light"
		style="--bs-border-style: dashed;"
		use:drag={{ cb: (f) => (file = f) }}
	>
		<input {form} type="file" {id} accept="image/jpg,image/jpeg" />

		<label class="position-absolute top-0 start-0 w-100 h-100" for={id} />

		{#key image}
			{#if image}
				<div>
					<button class="btn position-absolute top-0 end-0" on:click={clear}>
						<Icon name="close-circle" style="font-size:2rem" />
					</button>
					<img
						class="object-fit-cover rounded"
						style="width: 12rem; height: 12rem"
						src={image}
						alt="preview"
					/>
				</div>
			{:else}
				<Icon name="arrow-up" style="font-size:1.5em" />

				<div style="max-width: 70%; text-align:center">
					<p class="fw-semibold fs-5">
						Drag & Drop oder <strong class="text-primary">klicken</strong> um hochzuladen.
					</p>
					<p>Unterstützte Formate: jpeg, png</p>
				</div>
			{/if}
		{/key}
	</div>
</div>

<style>
	input[type='file'] {
		display: none;
	}
</style>
