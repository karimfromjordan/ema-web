<script>
	import AvatarList from '$lib/components/AvatarList.svelte';
	import Icon from '$lib/components/Icon.svelte';

	const shops = [
		{
			id: 1,
			name: 'Hauptfiliale',
			email: 'filiale@example.com',
			phone: '0123456789',
			address: 'Max Mustermann Strasse 5',
			image: '',
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
		},
		{
			id: 2,
			name: 'Hauptfiliale',
			email: 'filiale@example.com',
			phone: '0123456789',
			address: 'Max Mustermann Strasse 5',
			image: '',
			employees: [
				{
					id: 1,
					image_url: 'https://i.pravatar.cc/300',
					name: 'Karim Jordan'
				}
			]
		},
		{
			id: 3,
			name: 'Hauptfiliale',
			email: 'filiale@example.com',
			phone: '0123456789',
			address: 'Max Mustermann Strasse 5',
			image: '',
			employees: [
				{
					id: 1,
					image_url: 'https://i.pravatar.cc/300',
					name: 'Karim Jordan'
				}
			]
		},
		{
			id: 4,
			name: 'Hauptfiliale',
			email: 'filiale@example.com',
			phone: '0123456789',
			address: 'Max Mustermann Strasse 5',
			image: '',
			employees: [
				{
					id: 1,
					image_url: 'https://i.pravatar.cc/300',
					name: 'Karim Jordan'
				}
			]
		},
		{
			id: 5,
			name: 'Hauptfiliale',
			email: 'filiale@example.com',
			phone: '0123456789',
			address: 'Max Mustermann Strasse 5',
			image: '',
			employees: [
				{
					id: 1,
					image_url: 'https://i.pravatar.cc/300',
					name: 'Karim Jordan'
				}
			]
		}
	];
</script>

<div class="hstack justify-content-between align-items-end py-3">
	<h1>Filialen</h1>
	<a href="/dashboard/shops/create" class="btn btn-lg btn-success rounded-pill px-4">
		<i class="bi bi-plus" />
		Filiale erstellen
	</a>
</div>

<div class="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
	{#each shops as shop (shop.id)}
		<div class="col">
			<div class="card border-0 shadow-sm text-decoration-none">
				<img
					class="card-img-top p-3"
					src={shop.image || '/images/store-placeholder.png'}
					alt=""
				/>
				<div class="card-body">
					<h2 class="card-title fw-semibold fs-5">{shop.name}</h2>
					<div class="card-text text-secondary">
						<Icon name="location" />
						{shop.address}
					</div>
					<div class="card-text text-secondary">
						<Icon name="call" />
						{shop.phone}
					</div>
				</div>

				<div
					class="card-footer text-body-secondary d-flex justify-content-between align-items-center"
				>
					<AvatarList
						avatars={shop.employees.map((e) => ({
							image_url: e.image_url,
							title: e.name,
							circle: true,
							url: `/dashboard/team/${e.id}`
						}))}
					/>
					<a class="btn btn-primary" href="/dashboard/shops/{shop.id}">
						Details
						<i class="bi bi-chevron-right" />
					</a>
				</div>
			</div>
		</div>
	{/each}
</div>
