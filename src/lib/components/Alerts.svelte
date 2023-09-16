<script context="module">
	import { writable } from 'svelte/store';

	function create_store() {
		const { subscribe, update } = writable([]);

		return {
			subscribe,

			max: 3,
			timeout: 5000,
			is_closeable: true,

			show({ type, title, body, timeout = this.timeout, is_closeable = this.is_closeable }) {
				update((alerts) => [
					...alerts.slice(-1 * (this.max - 1)),
					{ type, title, body, timeout, is_closeable }
				]);
			},

			info(param) {
				this.show({ type: 'info', ...(typeof param === 'string' ? { body: param } : param) });
			},

			success(param) {
				this.show({ type: 'success', ...(typeof param === 'string' ? { body: param } : param) });
			},

			danger(param) {
				this.show({ type: 'danger', ...(typeof param === 'string' ? { body: param } : param) });
			},

			close(alert) {
				update((alerts) => alerts.filter((a) => a !== alert));
			},

			close_all() {
				update(() => []);
			}
		};
	}

	export const alerts = create_store();
</script>

<script>
	import { flip } from 'svelte/animate';
	import { fly, scale } from 'svelte/transition';

	export let position = 'start';

	function create_timeout(cb, delay) {
		let start;
		let timeout_id;

		function pause() {
			clearTimeout(timeout_id);
			delay -= new Date() - start;
		}

		function resume() {
			start = new Date();
			timeout_id = setTimeout(cb, delay);
		}

		function clear() {
			clearTimeout(timeout_id);
		}

		resume();

		return {
			resume,
			pause,
			clear
		};
	}

	function alert(node, alert) {
		if (!alert.timeout) return;

		const timeout = create_timeout(() => alerts.close(alert), alert.timeout);

		node.addEventListener('mouseenter', timeout.pause);
		node.addEventListener('mouseleave', timeout.resume);

		return {
			destroy() {
				timeout.clear();
			}
		};
	}
</script>

<div class="alerts-stack --{position}">
	{#each $alerts as alert_obj (alert_obj)}
		<div
			role="alert"
			class="alert --{alert_obj.type}"
			use:alert={alert_obj}
			animate:flip={{ duration: 200 }}
			in:fly={{ y: 15 * (position === 'start' ? -1 : 1), duration: 200 }}
			out:scale={{ duration: 200, start: 0.95 }}
		>
			{#if alert_obj.type === 'success'}
				<svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
					<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
					<polyline points="22 4 12 14.01 9 11.01" />
				</svg>
			{:else if alert_obj.type === 'danger'}
				<svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
					<circle cx="12" cy="12" r="10" />
					<line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
				</svg>
			{:else if alert_obj.type === 'info'}
				<svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
					<line x1="9" y1="18" x2="15" y2="18" />
					<line x1="10" y1="22" x2="14" y2="22" />
					<path
						d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"
					/>
				</svg>
			{/if}

			<div class="alert__content">
				{#if alert_obj.title}
					<div class="alert__title">{alert_obj.title}</div>
				{/if}

				{#if alert_obj.body}
					<div class="alert__body">{@html alert_obj.body}</div>
				{/if}
			</div>

			{#if alert_obj.is_closeable}
				{@const id = crypto.randomUUID()}

				<button
					type="button"
					aria-labelledby={id}
					class="close-btn"
					on:click={() => alerts.close(alert_obj)}
				>
					<svg viewBox="0 0 24 24" class="icon">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
					<span {id} hidden>Close alert</span>
				</button>
			{/if}
		</div>
	{/each}
</div>

<style>
	* {
		box-sizing: border-box;
	}

	.alerts-stack {
		display: flex;
		padding: 0 1em;
		margin: 0;
		position: fixed;
		inset-inline-start: 0;
		width: 100%;
		pointer-events: none;
		z-index: 9999;
	}

	.alerts-stack.--start {
		inset-block-start: 0;
		flex-direction: column-reverse;
	}

	.alerts-stack.--end {
		inset-block-end: 0;
		flex-direction: column;
	}

	.alert {
		padding: 0.75rem;
		border-radius: 0.25rem;
		margin-block: 0.25rem;
		margin-inline: auto;
		font-family: sans-serif;
		font-weight: 500;
		line-height: 1.5;
		color: white;
		display: flex;
		align-items: start;
		gap: 0.75rem;
		pointer-events: auto;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

		transition: scale 100ms;
	}

	.alert:has(.alert__title) {
		align-items: start;
	}

	.alert:hover {
		scale: 1.02;
	}

	.alert.--info {
		background-color: #3a98b9;
	}

	.alert.--success {
		background-color: hsl(171, 71%, 40%);
	}

	.alert.--warning {
		background-color: #ff6e31;
	}

	.alert.--danger {
		background-color: hsl(333, 81%, 40%);
	}

	.icon {
		inline-size: 1em;
		block-size: 1em;
		font-size: 1.5rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 0.125rem;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.alert__content {
	}

	.alert__title {
		font-weight: bold;
	}

	.alert__body {
	}

	.close-btn {
		padding: 0.25rem;
		border: none;
		margin: 0;
		appearance: none;
		display: grid;
		place-items: center;
		font: inherit;
		color: inherit;
		background: none;
		cursor: pointer;
		opacity: 0.8;
		border-radius: 50%;

		transition: opacity, 100ms;
	}

	.close-btn > .icon {
		font-size: 1rem;
		stroke-width: 0.2rem;
	}

	.close-btn:hover {
		opacity: 1;
		background-color: hsla(0, 0%, 0%, 0.1);
	}

	.close-btn:active {
		background-color: hsla(0, 0%, 0%, 0.2);
	}
</style>
