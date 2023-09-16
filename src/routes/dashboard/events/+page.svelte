<script>
	import Avatar from '$lib/components/Avatar.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import EventForm from './EventForm.svelte';
	import { events } from '$lib/stores/firebase.js';

	const dt_formatter = new Intl.DateTimeFormat('de-DE', { dateStyle: 'short' });

	const get_color = (status) => {
		switch (status) {
			case 'pending':
				return '#CCC8AA';
				break;

			case 'accepted':
				return '#071952';
				break;

			case 'rejected':
				return '#D80032';
				break;
		}
	};

	const transform_event = (event) => ({
		title: event.reason,
		color: get_color(event.status),
		start: event.starts_at,
		end: event.ends_at,
		allDay: true
	});
</script>

{#await events.list_all() then _}
	<div class="hstack justify-content-between py-3">
		<h1>Kalender</h1>
		<a href="/dashboard/events/create" class="btn btn-lg btn-success rounded-pill px-4">
			<i class="bi bi-plus" />
			Event erstellen
		</a>
	</div>

	<div class="card p-3 border-0 shadow-sm">
		<div class="card-body">
			<div class="row g-5">
				<div class="col-xl-8">
					<Calendar events={$events.list.map(transform_event)} />
				</div>
				<div class="col-xl-4 bg-secondary-subtle rounded p-3">
					<div class="row g-3">
						<div class="col-12">
							<div class="hstack justify-content-between mb-3">
								<h2>Angefragt</h2>
							</div>

							<ol class="vstack gap-2 p-0">
								{#each $events.list as event}
									<li
										class="d-flex gap-3 align-items-center justify-content-between border p-3 bg-white rounded shadow-sm"
										data-bs-toggle="modal"
										data-bs-target="#request-modal"
										style="cursor:pointer"
									>
										<div class="d-flex align-items-center gap-2">
											<Avatar image_url="https://i.pravatar.cc/300" size="1.25" />
											<div>
												<div class="fw-semibold">{event.employee?.name ?? ''}</div>
												<div>
													<span
														class="badge rounded-pill"
														class:text-bg-primary={event.reason === 'Urlaub'}
														class:text-bg-danger={event.reason === 'Krank'}>{event.reason}</span
													>
													<time datetime="">
														{dt_formatter.format(new Date(event.starts_at))}
														{#if event.ends_at}
															- {dt_formatter.format(new Date(event.ends_at))}
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
								{#each $events.list as event}
									<li
										class="d-flex gap-3 align-items-center justify-content-between border p-3 bg-white rounded shadow-sm"
										data-bs-toggle="modal"
										data-bs-target="#request-modal"
										style="cursor:pointer"
									>
										<div class="d-flex align-items-center gap-2">
											<Avatar image_url="https://i.pravatar.cc/300" size="1.25" />
											<div>
												<div class="fw-semibold">{event.employee?.name ?? ''}</div>
												<div>
													<span
														class="badge rounded-pill"
														class:text-bg-primary={event.reason === 'Urlaub'}
														class:text-bg-danger={event.reason === 'Krank'}>{event.reason}</span
													>
													<time datetime="">
														{dt_formatter.format(new Date(event.starts_at))}
														{#if event.ends_at}
															- {dt_formatter.format(new Date(event.ends_at))}
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
{/await}
