export default class SwapiService {

	_apiBase = 'https://swapi.dev/api';

	getSearch = async (search: string) => {
		const res = await fetch(`${this._apiBase}/${search}`);

		if (!res.ok) {
		throw new Error(`Could not fetch ${search}` + `, received ${res.status}`)
		}
		return await res.json();
	}
}
