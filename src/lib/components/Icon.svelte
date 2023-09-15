<script>
	export let name;
	export let style = '';

	let _class = '';

	export { _class as class };
</script>

<div class="icon {_class}">
	<svg {style}>
		<use xlink:href="#icon-{name}" />
	</svg>
</div>

<style>
	.icon {
		display: inline-block;
	}

	.icon > svg {
		display: inline-block;
		inline-size: 1em;
		block-size: 1em;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		vertical-align: -0.125em;
	}
</style>
