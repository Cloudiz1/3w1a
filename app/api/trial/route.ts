import { readFileSync, writeFileSync } from "fs"

export async function POST(request: Request) {
	let buffer = JSON.parse(readFileSync("./data/trials.json", "utf-8"));

	// always normalize to array
	let trials = Array.isArray(buffer.trials) ? buffer.trials : [];

	const body = await request.json();

	// find existing by name
	const index = trials.findIndex((t: any) => t.name === body.name);

	if (index !== -1) {
		// ✅ update existing
		trials[index] = body;
	} else {
		// ✅ add new
		trials.push(body);
	}

	writeFileSync("./data/trials.json", JSON.stringify({
		trials
	}));

	console.log(trials);

	return new Response();
}
