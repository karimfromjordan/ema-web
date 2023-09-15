<script>
	import Avatar from '$lib/components/Avatar.svelte';
	import AvatarList from '$lib/components/AvatarList.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { Chart, registerables } from 'chart.js';

	Chart.register(...registerables);

	export let shop = {
		id: 1,
		email: 'karim@hauptfiliale.de',
		name: 'Hauptfiliale',
		phone: '0123456789',
		address: 'Max Mustermann Strasse 12',
		image_url: '',
		employees: [
			{
				id: 1,
				image_url: 'https://i.pravatar.cc/300',
				name: 'Karim Jordan'
			},
			{
				id: 1,
				image_url: 'https://i.pravatar.cc/300',
				name: 'Karim Jordan'
			},
			{
				id: 1,

				image_url: 'https://i.pravatar.cc/300',
				name: 'Karim Jordan'
			}
		]
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
			type: 'line',
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
						data: [5, 6, 5, 7, 8, 6, 9, 12, 15, 13, 15, 17],
						cubicInterpolationMode: 'monotone',
						tension: 0.4,
						borderWidth: 3,
						borderColor: '#793FDF'
					}
				]
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	}
</script>

<div>
	<div class="d-flex justify-content-end align-items-start mb-3">
		<div class="d-flex gap-2">
			<a href="/dashboard/shops/{shop.id}/edit" class="btn btn btn-primary">
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
							<div>
								<div class="bg-primary-subtle d-flex" style="height: 7rem;">
									<div class="card-body text-primary">
										"Erfolg ist die Summe kleiner Anstrengungen, die Tag für Tag widerholt werden."
									</div>
									<img src="/images/profile-img.png" alt="" />
								</div>
								<div
									class="card-body d-flex justify-content-between align-items-center"
									style="margin-block-start: -2rem"
								>
									<div class="d-flex align-items-center gap-3">
										<Avatar size="2" circle />
										<div>
											<div class="fs-5 fw-semibold">{shop.name}</div>
										</div>
									</div>
									<AvatarList
										avatars={shop.employees.map((e) => ({
											image_url: e.image_url,
											title: e.name,
											circle: true,
											url: `/dashboard/team/${e.id}`
										}))}
									/>
								</div>
							</div>
						</div>
					</div>

					<div class="col-12">
						<div class="card border-0 shadow-sm">
							<div class="card-body">
								<h2 class="card-title fs-5 fw-semibold">Informationen</h2>

								<table class="table">
									<tbody>
										<tr>
											<th>
												<Icon name="call" />
												Telefon:
											</th>
											<td>{shop.phone}</td>
										</tr>
										<tr>
											<th>
												<Icon name="sms" />
												Email:
											</th>
											<td>{shop.email} </td>
										</tr>
										<tr>
											<th>
												<Icon name="location" />
												Adresse:
											</th>
											<td>{shop.address}</td>
										</tr>
									</tbody>
								</table>
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
								<h2 class="card-title fs-5 fw-semibold">Generiertes Einkommen</h2>
								<div class="row">
									<div class="col-lg-4">
										<div class="mb-3">
											<div class="text-secondary">Diesen Monat</div>
											<div class="fs-3 fw-semibold">$1000.00</div>
											<div><span class="badge text-bg-success">+20%</span> seit letzem Monat</div>
										</div>
										<div>
											<div class="text-secondary">Letzten Monat</div>
											<div class="fs-3 fw-semibold">$800.00</div>
										</div>
									</div>
									<div class="col-lg-8">
										<canvas use:chart />
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="col-md-12">
						<div class="card border-0 shadow-sm">
							<div class="card-body">
								<h2 class="card-title fs-5 fw-semibold">Letzte Verträge</h2>

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
