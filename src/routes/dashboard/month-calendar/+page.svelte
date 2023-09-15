<script>
	import Avatar from '$lib/components/Avatar.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import EventForm from './EventForm.svelte';

	const dt_formatter = new Intl.DateTimeFormat('de-DE', { dateStyle: 'short' });

	let msPerDay = 86400000;
	let msPerHour = 3600000;
	let currentTime = new Date().setHours(0, 0, 0, 0);

	const data = [
		{
			Id: 1,
			Subject: 'Explosion of Betelgeuse Star',
			StartTime: new Date(currentTime + msPerDay * -4 + msPerHour * 9),
			EndTime: new Date(currentTime + msPerDay * -4 + msPerHour * 11),
			CategoryColor: '#98AFC7',
			type: 'Urlaub',
			employee: {
				name: 'Karim Jordan'
			}
		},
		{
			Id: 2,
			Subject: 'Thule Air Crash Report',
			StartTime: new Date(currentTime + msPerDay * -3 + msPerHour * 12),
			EndTime: new Date(currentTime + msPerDay * -3 + msPerHour * 14),
			CategoryColor: '#99c68e',
			type: 'Urlaub',
			employee: {
				name: 'Karim Jordan'
			}
		},
		{
			Id: 3,
			Subject: 'Blue Moon Eclipse',
			StartTime: new Date(currentTime + msPerDay * -2 + msPerHour * 9),
			EndTime: new Date(currentTime + msPerDay * -2 + msPerHour * 11),
			CategoryColor: '#FF6969',
			type: 'Krank',
			employee: {
				name: 'Karim Jordan'
			}
		},
		{
			Id: 4,
			Subject: 'Meteor Showers',
			StartTime: new Date(currentTime + msPerDay * -1 + msPerHour * 13),
			EndTime: new Date(currentTime + msPerDay * -1 + msPerHour * 14),
			CategoryColor: '#95b9c7',
			type: 'Urlaub',
			employee: {
				name: 'Karim Jordan'
			}
		},
		{
			Id: 5,
			Subject: 'Milky Way as Melting pot',
			StartTime: new Date(currentTime + msPerHour * 12),
			EndTime: new Date(currentTime + msPerHour * 14),
			CategoryColor: '#95b9',
			type: 'Urlaub',
			employee: {
				name: 'Karim Jordan'
			}
		}
	];
</script>

<div class="hstack justify-content-between py-3">
	<h1>Kalender</h1>
	<button class="btn btn-lg btn-success rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#EventFormModal">
		<i class="bi bi-plus"></i>
		Event erstellen
	</button>
</div>

<div class="card p-3 border-0 shadow-sm">
	<div class="card-body">
		<div class="row g-5">
			<div class="col-xl-8">
				<Calendar {data} />
			</div>
			<div class="col-xl-4 bg-secondary-subtle rounded p-3">
				<div class="row g-3">
					<div class="col-12">
						<div class="hstack justify-content-between mb-3">
							<h2>Angefragt</h2>
						</div>

						<ol class="vstack gap-2 p-0">
							{#each data as item}
								<li
									class="d-flex gap-3 align-items-center justify-content-between border p-3 bg-white rounded shadow-sm"
									data-bs-toggle="modal"
									data-bs-target="#request-modal"
									style="cursor:pointer"
								>
									<div class="d-flex align-items-center gap-2">
										<Avatar image_url="https://i.pravatar.cc/300" size="1.25" />
										<div>
											<div class="fw-semibold">{item.employee.name}</div>
											<div>
												<span
													class="badge rounded-pill"
													class:text-bg-primary={item.type === 'Urlaub'}
													class:text-bg-danger={item.type === 'Krank'}>{item.type}</span
												>
												<time datetime="">
													{dt_formatter.format(item.StartTime)}
													{#if item.EndTime}
														- {dt_formatter.format(item.EndTime)}
													{/if}
												</time>
											</div>
										</div>
									</div>
									<span class="badge rounded-pill text-bg-warning">Angefragt</span>
								</li>
							{/each}
						</ol>
					</div>

					<div class="col-12">
						<div class="hstack justify-content-between mb-3">
							<h2>Bestätigt</h2>
						</div>

						<ol class="vstack gap-2 p-0">
							{#each data as item}
								<li
									class="d-flex gap-3 align-items-center justify-content-between border p-3 bg-white rounded shadow-sm"
									data-bs-toggle="modal"
									data-bs-target="#request-modal"
									style="cursor:pointer"
								>
									<div class="d-flex align-items-center gap-2">
										<Avatar image_url="https://i.pravatar.cc/300" size="1.25" />
										<div>
											<div class="fw-semibold">{item.employee.name}</div>
											<div>
												<span
													class="badge rounded-pill"
													class:text-bg-primary={item.type === 'Urlaub'}
													class:text-bg-danger={item.type === 'Krank'}>{item.type}</span
												>
												<time datetime="">
													{dt_formatter.format(item.StartTime)}
													{#if item.EndTime}
														- {dt_formatter.format(item.EndTime)}
													{/if}
												</time>
											</div>
										</div>
									</div>
									<span class="badge rounded-pill text-bg-warning">Angefragt</span>
								</li>
							{/each}
						</ol>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Modal -->
<div
	class="modal modal-xl fade"
	id="EventFormModal"
	tabindex="-1"
	aria-labelledby="EventFormModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="EventFormModalLabel">Anfrage erstellen</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<EventForm />
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">
					Abbrechen
				</button>
				<button type="button" class="btn btn-success">Speichern</button>
			</div>
		</div>
	</div>
</div>
