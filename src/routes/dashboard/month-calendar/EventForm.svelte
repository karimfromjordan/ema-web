<script>
	import Avatar from '$lib/components/Avatar.svelte';
	import Combobox from '$lib/components/Combobox.svelte';
	import ImageSelector from '$lib/components/ImageSelector.svelte';
	import { date_to_string } from '$lib/date';

	export let data = {
		start: date_to_string(),
		end: date_to_string(),
		allDay: true,
		reason: 'holidays',
		notes: '',
		status: 'pending',
		user_id: '123'
	};

	export let users = [];
</script>

<form>
	<div class="row">
		<div class="col-6">
			<div class="row g-3">
				<div class="col-12">
					<Combobox
						label="Mitarbeiter"
						options={[
							{ text: 'Karim', email: 'karim@example.com', image_url: '', value: '1' },
							{ text: 'Ardit', email: 'ardit@example.com', image_url: '', value: '2' }
						]}
					>
						<div slot="option" let:option class="d-flex gap-3 align-items-center">
							<Avatar image_url={option.image_url} />
							<div>
								<div style="font-weight: bold;">{option.text}</div>
								<div>{option.email}</div>
							</div>
						</div>
					</Combobox>
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
