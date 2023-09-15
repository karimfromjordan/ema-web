<script context="module">
	const data = [
		{
			icon: 'home',
			title: 'Dashboard',
			path: ''
		},
		{
			icon: 'task-square',
			title: 'Wochenplanung',
			path: '/dashboard/week-calendar'
		},
		{
			icon: 'calendar',
			title: 'Kalender',
			path: '/dashboard/month-calendar'
		},
		{
			icon: 'profile-circle',
			title: 'Team',
			path: '/dashboard/team'
		},
		{
			icon: 'shop',
			title: 'Filialen',
			path: '/dashboard/shops'
		},
		{
			icon: 'profile-2user',
			title: 'Kunden',
			path: '/dashboard/customers'
		},
		{
			icon: 'briefcase',
			title: 'Anbieter',
			path: ''
		},
		{
			icon: 'chart',
			title: 'Provision',
			path: ''
		},
		{
			icon: 'document-text',
			title: 'Verträge',
			path: ''
		}
	];
</script>

<script>
	import { page } from '$app/stores';
	import Icon from '$lib/components/Icon.svelte';
	import config from '$lib/config';

	const user = {
		email: 'name@example.com',
		name: 'Karim'
	};

	function go_fullscreen() {
		document.querySelector('html')?.requestFullscreen();
	}

	function navigation(container_elem, { button_selector } = {}) {
		/** @type {HTMLElement} */
		const parent_elem = container_elem.nextElementSibling;
		/** @type {HTMLButtonElement} */
		const button_elem = button_selector && document.querySelector(button_selector);

		const media_query = window.matchMedia('(max-width: 700px)');

		window.x ??= {};

		window.x.navigation = {
			show() {
				parent_elem.setAttribute('inert', '');

				container_elem.removeAttribute('inert');
				container_elem.classList.add('--overlay');
				container_elem.querySelector('a[aria-current="true"]')?.focus();

				button_elem.setAttribute('aria-expanded', 'true');
			},
			hide() {
				parent_elem.removeAttribute('inert');

				container_elem.setAttribute('inert', '');
				container_elem.classList.remove('--overlay');

				button_elem.setAttribute('aria-expanded', 'false');
			},
			toggle() {
				console.log(button_elem.getAttribute('aria-expanded'));
				button_elem.getAttribute('aria-expanded') === 'true' ? this.hide() : this.show();
			},
			stick() {
				parent_elem.removeAttribute('inert');
				container_elem.removeAttribute('inert');
				container_elem.classList.remove('--overlay');
			}
		};

		function handle_media_query(e) {
			e.matches ? window.x.navigation.hide() : window.x.navigation.stick();
		}

		media_query.addListener(handle_media_query);

		button_elem.addEventListener('click', (e) => {
			window.x.navigation.toggle();
		});

		document.addEventListener('click', (e) => {
			if (!container_elem.classList.contains('--overlay')) return;

			const is_link_click = container_elem.contains(e.target) && e.target.closest('a');
			const is_click_outside = e.target.contains(container_elem) && e.target !== container_elem;

			if (is_link_click || is_click_outside) {
				window.x.navigation.hide();
			}
		});

		document.addEventListener('keyup', (e) => {
			if (!container_elem.classList.contains('--overlay')) return;

			if (e.key === 'Escape') {
				window.x.navigation.hide();
			}
		});
	}
</script>

<div class="vh-100 overflow-hidden d-flex position-relative">
	<div
		class="_column-1 overflow-y-auto d-flex flex-column flex-shrink-0 lh-1"
		use:navigation={{ button_selector: '._menu-button' }}
	>
		<div class="_top-1 text-light">
			<span class="_logo__title" />
		</div>
		<nav class="_bottom-1 _nav h-100">
			<ul class="list-unstyled">
				{#each data as item}
					<li class="_nav__item position-relative">
						{#if item.path && $page.url.pathname.startsWith(item.path)}
							<div
								class="position-absolute top-0 start-0"
								style="background:white; width:0.25rem; height:100%; view-transition-name:indicator"
							/>
						{/if}
						<a
							href={item.path}
							aria-current={item.path ? $page.url.pathname.startsWith(item.path) : 'false'}
							style:opacity={item.path && $page.url.pathname.startsWith(item.path) ? 1 : 0.8}
							class:fw-semibold={item.path && $page.url.pathname.startsWith(item.path)}
							class="_nav__link d-flex align-items-center gap-3 text-white text-decoration-none py-3 px-4"
						>
							{#if item.icon}
								<Icon name={item.icon} style="font-size:1.5em" />
							{/if}
							<span class="_nav__title">
								{item.title}
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
	<div class="_column-2 d-flex flex-column flex-shrink-1 flex-grow-1">
		<div
			class="_top-2 d-flex justify-content-between align-items-center bg-white shadow-sm"
			style="z-index:100"
		>
			<div class="d-flex align-items-center gap-3">
				<button class="_menu-button btn btn-sm px-3 fs-1">
					<Icon name="menu" />
				</button>
				<nav class="_breadcrumbs" aria-label="breadcrumb">
					<ol class="breadcrumb mx-3 my-0">
						{#each $page.url.pathname.substring(1).split('/') as segment, index}
							<li class="breadcrumb-item" class:active={true} aria-current="page">
								<a
									class="text-decoration-none text-uppercase fs-6 fw-semibold text-secondary-emphasis"
									href="/{$page.url.pathname
										.substring(1)
										.split('/')
										.slice(0, index + 1)
										.join('/')}"
								>
									{#if segment === 'dashboard'}
										<Icon name="home" style="stroke-width:3" />
									{:else}
										{segment}
									{/if}
								</a>
							</li>
						{/each}
					</ol>
				</nav>
			</div>

			<div class="hstack">
				<button class="btn">
					<span>🇩🇪</span>
				</button>
				<button class="btn" on:click={go_fullscreen}>
					<Icon name="size" style="font-size:1.5em" />
				</button>
				<button class="btn">
					<Icon name="notification" style="font-size:1.5em" />
				</button>
				<div class="px-3">
					<div class="dropdown">
						<button
							class="btn dropdown-toggle d-flex align-items-center gap-2"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<div style="width:2rem; height:2rem; border-radius:50%; background:black" />
							<div class="user-email">{user.name}</div>
						</button>

						<ul class="dropdown-menu dropdown-menu-end border-0 shadow">
							<li>
								<a class="dropdown-item" href="#">
									<Icon name="profile-circle" class="align-middle" />
									Profil
								</a>
							</li>
							<li>
								<a class="dropdown-item" href="#">
									<Icon name="setting-2" class="align-middle" />
									Einstellungen
								</a>
							</li>
							<div class="dropdown-divider" />
							<li>
								<button class="dropdown-item">
									<Icon name="logout" class="align-middle" />
									Abmelden
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<main
			class="_bottom-2 overflow-y-auto h-100 bg-light p-3"
			style="view-transition-name: content"
		>
			<slot />
		</main>
	</div>
</div>

<style>
	._column-1 {
		--width: 300px;
		width: 250px;
		background: #2a3042;
	}

	._top-1,
	._top-2 {
		height: 4rem;
	}

	._menu-button {
		display: none;
	}

	._nav__link {
		color: white;
		opacity: 0.7;

		transition: color 200ms ease;
	}

	._nav__link:hover {
		opacity: 1;
	}

	@media (min-width: 700px) and (max-width: 1000px) {
		._column-1 {
			width: auto !important;
		}
		._logo__title,
		._breadcrumbs,
		._nav__title {
			display: none !important;
		}
	}

	@media (max-width: 700px) {
		._logo__title,
		._breadcrumbs,
		.user-email {
			display: none !important;
		}
		._menu-button {
			display: block !important;
		}
		._column-1 {
			height: 100%;
			position: absolute;
			z-index: 1000;
			inset-inline-start: calc(-1 * var(--width));

			transition: inset-inline-start 300ms;
		}

		._column-1:global(.--overlay) {
			inset-inline-start: 0px;
		}
	}

	/* View Transitions */
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(30px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-30px);
		}
	}

	:global(::view-transition-old(content)) {
		animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}

	:global(::view-transition-new(content)) {
		animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
	}
</style>
