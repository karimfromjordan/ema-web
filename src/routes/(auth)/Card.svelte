<script>
	import Icon from '$lib/components/Icon.svelte';

	export let title = '';
	export let subtitle = '';
</script>

<div class="card border-0 overflow-hidden shadow-sm">
	<div class="bg-primary-subtle">
		<div class="row">
			<div class="col-7">
				<div class="text-primary p-4">
					<div class="text-primary fs-5 fw-semibold">{title}</div>
					<p>{subtitle}</p>
				</div>
			</div>
			<div class="col-5 align-self-end">
				<img src="/images/profile-img.png" alt="" class="img-fluid" />
			</div>
		</div>
	</div>

	<div class="card-body pt-0">
		<a
			href="/"
			class="d-inline-block p-3 mb-2 rounded-circle bg-light"
			style="margin-block-start:-1.5rem"
		>
			<img src="/assets/images/logo.svg" alt="" style="width:3rem; height:3rem;" />
		</a>

		<div class="p-2">
			<slot name="body" />
		</div>
	</div>
</div>
