/**
 * @param {HTMLElement} element
 * @param {*} params
 */
export function focus(element, { condition = true } = {}) {
	if (condition) element.focus();
}

/**
 * @param {HTMLButtonElement} button_element
 * @param {*} param
 */
export function password_toggle(button_element, { input }) {
	function on_click(e) {
		const input_element = document.querySelector(input);

		input_element?.setAttribute(
			'type',
			input_element.getAttribute('type') === 'text' ? 'password' : 'text'
		);
	}

	return {
		destroy() {
			button_element.removeEventListener('click', on_click);
		}
	};
}

export function on_click_outside(element, callback) {
	const on_click = (event) => !element.contains(event.target) && callback();

	document.body.addEventListener('mousedown', on_click);

	return {
		update(new_callback) {
			callback = new_callback;
		},

		destroy() {
			document.body.removeEventListener('mousedown', on_click);
		}
	};
}
