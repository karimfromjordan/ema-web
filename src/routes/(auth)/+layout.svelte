<script>
	import config from '$lib/config';
</script>

<div class="min-vh-100 d-flex justify-content-center align-items-center bg-light">
	<div class="container">
		<div class="d-flex justify-content-center align-items-center">
			<div class="flex-shrink-1" style="flex-basis: 26rem">
				<slot />
				<div class="mt-5 text-center">
					<p>
						Don&apos;t have an account?
						<a href="/signup" class="fw-medium text-primary">Signup now</a>
					</p>
					<p>
						&copy; {new Date().getFullYear()}
						{config.copyright}
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
