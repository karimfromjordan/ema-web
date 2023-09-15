<script>
	import Avatar from './Avatar.svelte';

	export let avatars = [];

	export let margin = '-1rem';
</script>

<div class="avatar-stack" style="--margin:{margin}">
	{#each avatars as avatar}
		<div>
			<Avatar {...avatar} />
		</div>
	{/each}
</div>

<style>
	.avatar-stack {
		display: flex;
	}

	.avatar-stack > div:not(:first-child) {
		margin-inline-start: var(--margin);
	}
</style>
