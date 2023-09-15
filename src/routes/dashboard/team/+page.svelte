<script>
	const users = [
		{
			id: 1,
			name: 'Karim Jordan',
			email: 'karim@example.com',
			phone: '0123456789',
			profile_image: '',
			store: 'Berlin',
			position: 'Verkäufer'
		},
		{
			id: 2,
			name: 'Karim Jordan',
			email: 'karim@example.com',
			phone: '0123456789',
			profile_image: '',
			store: 'Berlin',
			position: 'Verkäufer'
		},
		{
			id: 3,
			name: 'Karim Jordan',
			email: 'karim@example.com',
			phone: '0123456789',
			profile_image: '',
			store: 'Berlin',
			position: 'Verkäufer'
		},
		{
			id: 4,
			name: 'Karim Jordan',
			email: 'karim@example.com',
			phone: '0123456789',
			profile_image: '',
			store: 'Berlin',
			position: 'Verkäufer'
		},
		{
			id: 5,
			name: 'Karim Jordan',
			email: 'karim@example.com',
			phone: '0123456789',
			profile_image: '',
			store: 'Berlin',
			position: 'Verkäufer'
		}
	];
</script>

<div class="d-flex justify-content-between align-items-end py-3">
	<h1>Mitarbeiter</h1>
	<a href="/dashboard/team/create" class="btn btn-lg btn-success rounded-pill px-4">
		<i class="bi bi-plus"></i>
		Mitarbeiter erstellen
	</a>
</div>

<div class="card border-0 shadow-sm">
	<div class="card-body">
		<div class="table-responsive">
			<table class="table table-striped table-hover align-middle">
				<thead>
					<tr>
						<th scope="col-3">Name</th>
						<th scope="col-2">Email</th>
						<th scope="col">Telefon</th>
						<th scope="col">Filiale</th>
						<th scope="col-1" />
					</tr>
				</thead>
				<tbody>
					{#each users as user (user.id)}
						<tr>
							<td>
								<a
									href="/dashboard/team/{user.id}"
									class="text-decoration-none text-body d-flex align-items-center gap-2"
								>
									<img
										style="width:2rem; height:2rem; border-radius:50%; object-fit:cover;"
										src={user.profile_image || '/images/profile-circle.svg'}
										alt="Profile"
									/>
									<div>
										<div class="fw-semibold">{user.name}</div>
										<div>{user.position}</div>
									</div>
								</a>
							</td>
							<td>
								<a class="text-decoration-none text-body" href="/dashboard/team/{user.id}">
									{user.email}
								</a>
							</td>

							<td>
								<a class="text-decoration-none text-body" href="/dashboard/team/{user.id}">
									{user.phone}
								</a>
							</td>
							<td>
								<a class="text-decoration-none text-body" href="/dashboard/team/{user.id}">
									{user.store}
								</a>
							</td>
							<td />
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
