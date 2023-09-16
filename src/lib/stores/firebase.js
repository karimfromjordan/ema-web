import { readable, writable } from 'svelte/store';

import { alerts } from '$lib/components/Alerts.svelte';

const _is_loading = writable(false);

const is_loading = { subscribe: _is_loading.subscribe };

const v = 0;

function create_auth_store() {
	/** @type {import('firebase/auth').Auth} */
	let auth;

	const { subscribe } = readable(undefined, (set) => {
		let stop = () => {};

		async function start() {
			const { app } = await import('../firebase_app');
			const { getAuth, onAuthStateChanged } = await import('firebase/auth');

			auth = getAuth(app);
			stop = onAuthStateChanged(auth, set);
		}

		start();

		return stop;
	});

	return {
		subscribe,

		/**
		 * @param {string} email
		 * @param {string} password
		 */
		async sign_up(email, password) {
			const { createUserWithEmailAndPassword } = await import('firebase/auth');
			await createUserWithEmailAndPassword(auth, email, password);
		},

		/**
		 * @param {string} email
		 * @param {string} password
		 * @param {boolean} remember_me
		 */
		async sign_in(email, password, remember_me = true) {
			_is_loading.set(true);

			await import('firebase/auth')
				.then(({ signInWithEmailAndPassword }) => signInWithEmailAndPassword(auth, email, password))
				.catch(() => alerts.danger('Falsche Emailadresse oder Passwort.'))
				.finally(() => _is_loading.set(false));
		},

		async sign_out() {
			_is_loading.set(true);

			await import('firebase/auth')
				.then(({ signOut }) => signOut(auth))
				.finally(() => _is_loading.set(false));
		},
		/**
		 * @param {string} email
		 * @param {string} password
		 */
		async create(email, password) {
			_is_loading.set(true);

			const { createUserWithEmailAndPassword } = await import('firebase/auth');

			await import('firebase/auth')
				.then(({ createUserWithEmailAndPassword }) =>
					createUserWithEmailAndPassword(auth, email, password)
				)
				.then(() => alerts.success('Benutzer wurde erstellt.'))
				.catch((error) => alerts.danger('Benutzer konnte nicht erstellt werden.'))
				.finally(() => _is_loading.set(false));
		},

		/**
		 * @param {string} email
		 */
		async request_password(email) {
			_is_loading.set(true);

			await import('firebase/auth')
				.then(({ sendPasswordResetEmail }) => sendPasswordResetEmail(auth, email))
				.then(() => alerts.success('Email wurde gesendet.'))
				.catch(() => alerts.danger('Ein Konto unter dieser Email existiert nicht.'))
				.finally(() => _is_loading.set(false));
		},

		/**
		 * @param {string} oob_code
		 * @param {string} new_password
		 */
		async confirm_password(oob_code, new_password) {
			_is_loading.set(true);

			await import('firebase/auth')
				.then(({ confirmPasswordReset }) => confirmPasswordReset(auth, oob_code, new_password))
				.then(() => {})
				.catch(() => {})
				.finally(() => _is_loading.set(false));
		}
	};
}

function create_users_store() {
	const { subscribe, set, update } = writable({ list: [] });

	async function db() {
		const { app } = await import('../firebase_app');
		const { getFirestore } = await import('firebase/firestore');

		return getFirestore(app);
	}

	return {
		subscribe,

		async list_all() {
			const { collection, getDocs, query, where } = await import('firebase/firestore');

			const snapshot = await getDocs(query(collection(await db(), 'users'), where('v', '==', v)));

			update((value) => ({ ...value, list: snapshot.docs.map((d) => d.data()) }));
		},
		async get(id) {
			const { doc, getDoc } = await import('firebase/firestore');

			const doc_ref = doc(await db(), 'users', id);
			const snapshot = await getDoc(doc_ref);

			if (snapshot.exists()) {
				update((value) => ({ ...value, user: snapshot.data() }));
			} else {
				alerts.danger('Benutzer existiert nicht.');
			}
		},
		async create(data) {
			_is_loading.set(true);

			const { doc, collection, setDoc } = await import('firebase/firestore');

			const ref = doc(collection(await db(), 'users'));

			await setDoc(ref, { ...data, id: ref.id, v })
				.then((docRef) => alerts.success('Mitarbeiter wurde erstellt.'))
				.catch((error) => alerts.danger('Mitarbeiter konnte nicht aktualisiert werden.'))
				.finally(() => _is_loading.set(false));
		},
		async update(id, data) {
			_is_loading.set(true);

			const { doc, updateDoc } = await import('firebase/firestore');

			const doc_ref = doc(await db(), 'users', id);

			await updateDoc(doc_ref, data)
				.then((docRef) => alerts.success('Mitarbeiter wurde aktualisiert.'))
				.catch((error) => alerts.danger('Mitarbeiter konnte nicht aktualisiert werden.'))
				.finally(() => _is_loading.set(false));
		},
		/**
		 * @param {string} id
		 */
		async delete(id) {
			const { doc, deleteDoc } = await import('firebase/firestore');

			if (confirm('Bist Du sicher, dass Du diesen Mitarbeiter löschen möchtest?')) {
				await deleteDoc(doc(await db(), 'users', id));
			}
		},
		async reset_password(id) {}
	};
}

function create_shops_store() {
	const { subscribe, set, update } = writable({ list: [] });

	async function db() {
		const { app } = await import('../firebase_app');
		const { getFirestore } = await import('firebase/firestore');

		return getFirestore(app);
	}

	return {
		subscribe,

		async list_all() {
			const { collection, getDocs, query, where } = await import('firebase/firestore');

			const snapshot = await getDocs(query(collection(await db(), 'shops'), where('v', '==', v)));

			update((value) => ({ ...value, list: snapshot.docs.map((d) => d.data()) }));
		},
		async get(id) {
			const { doc, getDoc } = await import('firebase/firestore');

			const ref = doc(await db(), 'shops', id);
			const snapshot = await getDoc(ref);

			if (snapshot.exists()) {
				update((value) => ({ ...value, shop: snapshot.data() }));
			} else {
				alerts.danger('Filiale existiert nicht.');
			}
		},
		async create(data) {
			_is_loading.set(true);

			const { doc, collection, setDoc } = await import('firebase/firestore');

			const ref = doc(collection(await db(), 'shops'));

			await setDoc(ref, { ...data, id: ref.id, v })
				.then((docRef) => alerts.success('Filiale wurde erstellt.'))
				.catch((error) => alerts.danger('Filiale konnte nicht aktualisiert werden.'))
				.finally(() => _is_loading.set(false));
		},
		async update(id, data) {
			_is_loading.set(true);

			const { doc, updateDoc } = await import('firebase/firestore');

			const doc_ref = doc(await db(), 'shops', id);

			await updateDoc(doc_ref, data)
				.then((docRef) => alerts.success('Mitarbeiter wurde aktualisiert.'))
				.catch((error) => alerts.danger('Mitarbeiter konnte nicht aktualisiert werden.'))
				.finally(() => _is_loading.set(false));
		},
		/**
		 * @param {string} id
		 */
		async delete(id) {
			const { doc, deleteDoc } = await import('firebase/firestore');

			if (confirm('Bist Du sicher, dass Du diese Filiale löschen möchtest?')) {
				await deleteDoc(doc(await db(), 'shops', id));
			}
		}
	};
}

function create_events_store() {
	const { subscribe, set, update } = writable({ list: [] });

	async function db() {
		const { app } = await import('../firebase_app');
		const { getFirestore } = await import('firebase/firestore');

		return getFirestore(app);
	}

	return {
		subscribe,

		async list_all() {
			const { collection, getDocs, query, where } = await import('firebase/firestore');

			const snapshot = await getDocs(query(collection(await db(), 'events'), where('v', '==', v)));

			update((value) => ({ ...value, list: snapshot.docs.map((d) => d.data()) }));
		},
		async get(id) {
			const { doc, getDoc } = await import('firebase/firestore');

			const ref = doc(await db(), 'events', id);
			const snapshot = await getDoc(ref);

			if (snapshot.exists()) {
				update((value) => ({ ...value, shop: snapshot.data() }));
			} else {
				alerts.danger('Event existiert nicht.');
			}
		},
		async create(data) {
			_is_loading.set(true);

			const { doc, collection, setDoc } = await import('firebase/firestore');

			const ref = doc(collection(await db(), 'shops'));

			await setDoc(ref, { ...data, id: ref.id, v })
				.then((docRef) => alerts.success('Event wurde erstellt.'))
				.catch((error) => alerts.danger('Event konnte nicht aktualisiert werden.'))
				.finally(() => _is_loading.set(false));
		},
		async update(id, data) {
			_is_loading.set(true);

			const { doc, updateDoc } = await import('firebase/firestore');

			const doc_ref = doc(await db(), 'shops', id);

			await updateDoc(doc_ref, data)
				.then((docRef) => alerts.success('Event wurde aktualisiert.'))
				.catch((error) => alerts.danger('Event konnte nicht aktualisiert werden.'))
				.finally(() => _is_loading.set(false));
		},
		/**
		 * @param {string} id
		 */
		async delete(id) {
			const { doc, deleteDoc } = await import('firebase/firestore');

			if (confirm('Bist Du sicher, dass Du dieses Event löschen möchtest?')) {
				await deleteDoc(doc(await db(), 'shops', id));
			}
		}
	};
}

const auth = create_auth_store();
const users = create_users_store();
const shops = create_shops_store();

export { is_loading, auth, users, shops };
