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
		user_id: ''
	};

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
						bind:value={data.start}
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
						bind:value={data.end}
						type="date"
						id="end"
						required
						min={data.start}
					/>
				</div>

				<div class="mb-3">
					<label for="notes" class="form-label">Notizen (optional)</label>
					<textarea class="form-control" id="notes" rows="3" />
				</div>
			</div>
		</div>
		<div class="col-6">
			<ImageSelector />
		</div>
	</div>
</form>
