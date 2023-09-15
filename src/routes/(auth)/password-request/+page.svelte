<script>
	import { focus } from '$lib/actions';
	import Card from '../Card.svelte';

	let email = '';

	/** @param {SubmitEvent} e */
	async function handle_form(e) {}
</script>

<Card title="Passwort vergessen">
	<svelte:fragment slot="body">
		<p>Gib Deine Email unten ein und wir senden Dir einen Link um das Passwort zurueckzusetzen.</p>

		<form on:submit|preventDefault={handle_form}>
			<div class="mb-3">
				<label for="email" class="form-label">Email</label>
				<input
					type="text"
					class="form-control"
					id="email"
					required
					placeholder="name@example.com"
					bind:value={email}
					use:focus={{ condition: email === '' }}
				/>
			</div>

			<div class="mt-3 d-grid">
				<button class="btn btn-primary w-md waves-effect waves-light" disabled={true}>
					{#if true}
						<div class="spinner-border spinner-border-sm" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					{/if}
					Email senden
				</button>
			</div>
		</form>

		<div class="mt-4 text-center">
			<a href="/dashboard" class="text-muted">
				<i class="bi bi-box-arrow-in-right me-1" /> Einloggen
			</a>
		</div>
	</svelte:fragment>
</Card>
