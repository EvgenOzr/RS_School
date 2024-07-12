const SwapiService =  async (search: string) => {
	const res = await fetch(`https://swapi.dev/api/${search}`);

	if (!res.ok) {
	throw new Error(`Could not fetch ${search}` + `, received ${res.status}`)
	}
	return await res.json();
}

export default SwapiService;
