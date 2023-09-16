<script>
	import Icon from '$lib/components/Icon.svelte';
	import { Chart, registerables } from 'chart.js';
	import { users } from '$lib/stores/firebase';
	import { page } from '$app/stores';

	Chart.register(...registerables);

	export let _user = {
		id: 1,
		email: '',
		name: 'Karim Jordan',
		phone: '0123456789',
		address: 'Max Mustermann Strasse 12',
		born_at: '',
		position: '',
		form_of_employment: 'Verkäufer',
		holidays_per_year: 20,
		profile_image: '',
		default_store: null
	};

	const contracts = [
		{
			customer_name: 'Karim Jordan',
			start: '2022-10-01',
			end: '2023-10-01',
			provision: 10
		},
		{
			customer_name: 'Karim Jordan',
			start: '2022-10-01',
			end: '2023-10-01',
			provision: 10
		},
		{
			customer_name: 'Karim Jordan',
			start: '2022-10-01',
			end: '2023-10-01',
			provision: 10
		},
		{
			customer_name: 'Karim Jordan',
			start: '2022-10-01',
			end: '2023-10-01',
			provision: 10
		},
		{
			customer_name: 'Karim Jordan',
			start: '2022-10-01',
			end: '2023-10-01',
			provision: 10
		},
		{
			customer_name: 'Karim Jordan',
			start: '2022-10-01',
			end: '2023-10-01',
			provision: 10
		}
	];

	function chart(canvas_element) {
		new Chart(canvas_element, {
			type: 'bar',
			data: {
				labels: [
					'Jan',
					'Feb',
					'Mar',
					'Apr',
					'Mai',
					'Jun',
					'Jul',
					'Aug',
					'Sep',
					'Okt',
					'Nov',
					'Dez'
				],
				datasets: [
					{
						label: 'Euro',
						data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
						borderWidth: 0,
						barThickness: 8,
						borderRadius: 9999,
						backgroundColor: '#556EE6'
					}
				]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	}
</script>

{#await users.get($page.params.id) then _}
	<div>
		<div class="d-flex justify-content-end align-items-start mb-3">
			<div class="d-flex gap-2">
				<a href="/dashboard/team/{$users.user.id}/edit" class="btn btn btn-primary">
					<Icon name="edit" />
					Bearbeiten
				</a>
			</div>
		</div>

		<div>
			<div class="row g-3">
				<div class="col-lg-4">
					<div class="row g-3">
						<div class="col-12">
							<div class="card border-0 shadow-sm">
								<div class="card-body">
									<div class="d-flex align-items-center gap-3">
										<img
											class="rounded-circle"
											style="width:5rem; height:5rem"
											src={$users.user.profile_image || '/images/profile-circle.svg'}
											alt=""
										/>
										<div>
											<div class="fs-5 fw-semibold">{$users.user.name}</div>
											<div>{$users.user.form_of_employment}</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-12">
							<div class="card border-0 shadow-sm">
								<div class="card-body">
									<h2 class="card-title fs-5">Informationen</h2>

									<table class="table">
										<tbody>
											<tr>
												<th>Telefon:</th>
												<td>{$users.user.phone}</td>
											</tr>
											<tr>
												<th>Email:</th>
												<td>{$users.user.email} </td>
											</tr>
											<tr>
												<th>Adresse:</th>
												<td>{$users.user.address}</td>
											</tr>
											<tr>
												<th>Geburtsdatum:</th>
												<td>{$users.user.born_at} </td>
											</tr>
											<tr>
												<th>Stelle</th>
												<td>{$users.user.position}</td>
											</tr>
											<tr>
												<th>Arbeitszeit</th>
												<td>{$users.user.form_of_employment} </td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>

						<div class="col-md-12">
							<div class="card border-0 shadow-sm" style="height: 20rem;">
								<div class="card-body">
									<h2 class="card-title fs-5">Letzte Aktivität</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-8">
					<div class="row g-3">
						<div class="col">
							<div class="card border-0 shadow-sm">
								<div class="card-body d-flex justify-content-between align-items-center">
									<div class="fw-semibold">
										<h2 class="card-title fs-5">Verträge</h2>
										<p>100</p>
									</div>
									<div
										class="d-flex justify-content-center align-items-center bg-primary rounded-circle text-white"
										style="width:3rem; height:3rem;"
									>
										<Icon name="home" style="" />
									</div>
								</div>
							</div>
						</div>
						<div class="col">
							<div class="card border-0 shadow-sm">
								<div class="card-body d-flex justify-content-between align-items-center">
									<div class="fw-semibold">
										<h2 class="card-title fs-5">Urlaubstage</h2>
										<p>{$users.user.holidays_per_year}</p>
									</div>
									<div
										class="d-flex justify-content-center align-items-center bg-primary rounded-circle text-white"
										style="width:3rem; height:3rem;"
									>
										<Icon name="home" style="" />
									</div>
								</div>
							</div>
						</div>
						<div class="col">
							<div class="card border-0 shadow-sm">
								<div class="card-body d-flex justify-content-between align-items-center">
									<div class="fw-semibold">
										<h2 class="card-title fs-5">Einkommen</h2>
										<p>100</p>
									</div>
									<div
										class="d-flex justify-content-center align-items-center bg-primary rounded-circle text-white"
										style="width:3rem; height:3rem;"
									>
										<Icon name="home" style="" />
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-12">
							<div class="card border-0 shadow-sm">
								<div class="card-body">
									<h2 class="card-title fs-5">Generiertes Einkommen</h2>
									<canvas use:chart />
								</div>
							</div>
						</div>

						<div class="col-md-12">
							<div class="card border-0 shadow-sm">
								<div class="card-body">
									<h2 class="card-title fs-5">Letzte Verträge</h2>

									<table class="table">
										<tbody>
											<tr>
												<th>Kundenname</th>
												<th>Startdatum</th>
												<th>Enddatum</th>
												<th>Provision</th>
											</tr>
											{#each contracts as contract}
												<tr>
													<td>{contract.customer_name}</td>
													<td>{contract.start}</td>
													<td>{contract.end}</td>
													<td>{contract.provision}</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/await}
