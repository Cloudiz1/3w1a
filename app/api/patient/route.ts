import { readFileSync, writeFileSync } from "fs"

export async function POST(req: Request) {
	let buffer = JSON.parse(readFileSync("./data/trials.json", "utf-8"));
	let set = new Set(buffer.trials);

    const body = await req.json();
	set.add(body);
	writeFileSync("./data/trials.json", JSON.stringify({
		"trials": buffer,
	}))	

    return new Response();
}
