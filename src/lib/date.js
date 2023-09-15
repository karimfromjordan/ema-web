export function date_to_string(date = new Date()) {
	const date_utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
	return date_utc.toISOString().slice(0, 10);
}
