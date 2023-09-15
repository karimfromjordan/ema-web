<script>
	import 'bootstrap-icons/font/bootstrap-icons.css';

	import { Calendar } from '@fullcalendar/core';
	import daygrid_plugin from '@fullcalendar/daygrid';
	import timegrid_plugin from '@fullcalendar/timegrid';
	import list_plugin from '@fullcalendar/list';
	import interaction_plugin from '@fullcalendar/interaction';
	import bootstrap5_plugin from '@fullcalendar/bootstrap5';
	import de_locale from '@fullcalendar/core/locales/de';

	export let events = [];

	let calendar_obj;

	/**
	 * @param {HTMLElement} element
	 * @param {Object} params
	 */
	function calendar(element, params = {}) {
		calendar_obj = new Calendar(element, {
			plugins: [
				daygrid_plugin,
				timegrid_plugin,
				list_plugin,
				interaction_plugin,
				bootstrap5_plugin
			],
			themeSystem: 'bootstrap5',
			locale: de_locale,
			initialView: 'dayGridMonth',
			weekNumbers: true,
			events,
			headerToolbar: {
				left: 'title',
				center: '',
				right: 'prev,next today'
			}
		});

		calendar_obj.on('dateClick', () => {});

		calendar_obj.render();
	}
</script>

<div use:calendar />
