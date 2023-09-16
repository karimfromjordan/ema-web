<script>
	import { focus, password_toggle } from '$lib/actions';
	import Icon from '$lib/components/Icon.svelte';
	import Card from '../Card.svelte';
	import config from '$lib/config';
	import { is_loading, auth } from '$lib/stores/firebase.js';
	import { goto } from '$app/navigation';

	let email = 'demo@example.com';
	let password = '0123456789';
	let remember_me = false;

	/** @param {SubmitEvent} e */
	async function handle_signin_form(e) {
		auth.sign_in(email, password).then(() => goto('/dashboard'));
	}
</script>

<Card title="Willkommen!" subtitle="Logge Dich ein">
	<svelte:fragment slot="body">
		<form class="vstack gap-4" on:submit|preventDefault={handle_signin_form}>
			<div class="vstack gap-3">
				<div>
					<label for="email" class="form-label">Email</label>
					<input
						type="email"
						class="form-control"
						id="email"
						required
						placeholder="name@example.com"
						bind:value={email}
						use:focus={{ condition: email === '' }}
					/>
				</div>

				<div>
					<label class="form-label" for="password">Password</label>
					<div class="input-group">
						<input
							type="password"
							class="form-control"
							id="password"
							required
							bind:value={password}
							use:focus={{ condition: email !== '' }}
						/>
						<button
							class="btn btn-outline-secondary"
							type="button"
							use:password_toggle={{ input: '#password' }}
						>
							<Icon name="eye" />
						</button>
					</div>
				</div>

				<div class="form-check">
					<input
						class="form-check-input"
						type="checkbox"
						id="remember-check"
						bind:checked={remember_me}
					/>
					<label class="form-check-label" for="remember-check"> Eingeloggt bleiben </label>
				</div>
			</div>

			<button class="btn btn-primary w-md waves-effect waves-light" disabled={$is_loading}>
				{#if $is_loading}
					<div class="spinner-border spinner-border-sm" role="status">
						<span class="visually-hidden">{$is_loading ? 'Einen Moment...' : 'Einloggen'}</span>
					</div>
				{/if}
				{$is_loading ? 'Einen Moment...' : 'Einloggen'}
			</button>
		</form>

		<div class="mt-4 text-center">
			<a href="/password-request" class="text-muted">
				<Icon name="lock" /> Passwort vergessen
			</a>
		</div>
	</svelte:fragment>
</Card>
