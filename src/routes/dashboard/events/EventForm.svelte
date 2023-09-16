<script>
	import Avatar from '$lib/components/Avatar.svelte';
	import Combobox from '$lib/components/Combobox.svelte';
	import ImageSelector from '$lib/components/ImageSelector.svelte';
	import { date_to_string } from '$lib/date';
	import { users } from '$lib/stores/firebase.js';
	import { createEventDispatcher } from 'svelte';

	export let data = {
		starts_at: date_to_string(),
		ends_at: date_to_string(),
		all_day: true,
		reason: 'holidays',
		notes: '',
		status: 'pending',
		employee_id: ''
	};

	export let button_label = 'Save';
	export let is_loading = false;

	const dispatch = createEventDispatcher();
</script>

<form on:submit|preventDefault={() => dispatch('submit', data)}>
	<div class="row">
		<div class="col-6">
			<div class="row g-3">
				<div class="col-12">
					{#await users.list_all then _}
						<Combobox
							label="Mitarbeiter"
							name="employee_id"
							bind:value={data.employee_id}
							options={$users.list.map((u) => ({
								text: u.name,
								value: u.id,
								email: u.email,
								image_url: ''
							}))}
						>
							<div slot="option" let:option class="d-flex gap-3 align-items-center">
								<Avatar image_url={option.image_url} />
								<div>
									<div style="font-weight: bold;">{option.text}</div>
									<div>{option.email}</div>
								</div>
							</div>
						</Combobox>
					{/await}
				</div>

				<div class="col-12">
					<label class="form-label" for="reason">Anlass</label>
					<select class="form-select" id="reason" bind:value={data.reason} required>
						<option value="sick">Krank</option>
						<option value="holidays">Urlaub</option>
					</select>
				</div>

				<div class="col-6">
					<label class="form-label" for="start">Von</label>
					<input
						class="form-control"
						bind:value={data.starts_at}
						type="date"
						id="start"
						required
						min={date_to_string()}
					/>
				</div>

				<div class="col-6">
					<label class="form-label" for="end">Bis</label>
					<input
						class="form-control"
						bind:value={data.ends_at}
						type="date"
						id="end"
						required
						min={data.starts_at}
					/>
				</div>

				<div class="mb-3">
					<label for="notes" class="form-label">Notizen (optional)</label>
					<textarea class="form-control" id="notes" rows="3" bind:value={data.notes} />
				</div>
			</div>
		</div>
		<div class="col-6">
			<ImageSelector />
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
