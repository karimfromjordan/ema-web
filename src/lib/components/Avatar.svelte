<script>
	/** @type {string} */
	export let image_url;
	/** @type {string} */
	export let title = '';
	/** @type {string} */
	export let url = '';

	export let size = '1';

	export let circle = false;

	/**
	 * @param {HTMLElement} element
	 * @param param1
	 */
	function tooltip(element, { title }) {
		if (!title) return;

		element.setAttribute('data-bs-toggle', 'tooltip');
		element.setAttribute('data-bs-title', title);

		new window.bootstrap.Tooltip(element);
	}
</script>

{#if url}
	<div class="avatar" use:tooltip={{ title }} href={url} style="--size: {size}">
		<a href={url}>
			<div class="avatar__background {circle ? 'rounded-circle' : 'rounded'}">
				{#if image_url}
					<img
						class="avatar__image {circle ? 'rounded-circle' : 'rounded'}"
						src={image_url}
						alt="avatar"
					/>
				{:else}
					<svg
						class="avatar__placeholder"
						width="32"
						height="32"
						fill="#000000"
						viewBox="0 0 256 256"
					>
						<path
							d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"
						/>
					</svg>
				{/if}
			</div>
		</a>
	</div>
{:else}
	<div class="avatar" use:tooltip={{ title }} style="--size: {size}">
		<div class="avatar__background {circle ? 'rounded-circle' : 'rounded'}">
			{#if image_url}
				<img
					class="avatar__image {circle ? 'rounded-circle' : 'rounded'}"
					src={image_url}
					alt="avatar"
				/>
			{:else}
				<svg class="avatar__placeholder" fill="#000000" viewBox="0 0 256 256">
					<path
						d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"
					/>
				</svg>
			{/if}
		</div>
	</div>
{/if}

<style>
	.avatar {
		width: calc(2.5rem * var(--size));
		height: calc(2.5rem * var(--size));
	}

	.avatar__background {
		padding: 0.125rem;
		background-color: white;
	}

	.avatar__image {
		width: 100%;
		object-fit: cover;
	}
</style>
