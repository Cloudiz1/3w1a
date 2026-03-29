import { readFileSync } from "fs"
import { FilterKind, Patient, Attribute } from "../types"
import { Dash } from "./dash"

export type FilterSchema = 
	{
		name: string;
		type: FilterKind.Range;
		min: number;
		max: number;
	} |
	{
		name: string;
		type: FilterKind.Categorical | FilterKind.MultiSelect;
		options: Array<string>;
};

function getKind(type: String): FilterKind | undefined {
	switch (type) {
		case "range": return FilterKind.Range;
		case "multi_select": return FilterKind.MultiSelect;
		case "categorical": return FilterKind.Categorical;
		default: {
			return undefined;
		}
	}
}

function parsePatients(data: any[]): Patient[] {
	return data.map((p) => {
		const attrMap = new Map<string, Attribute>();

		for (const [key, raw] of Object.entries(p.attributes || {})) {
			const attr = raw as Attribute;
			attrMap.set(key, attr);
		}

		return {
			name: p.name,
			id: p.id,
			attributes: attrMap,
			notes: p.notes,
		};
	});
}

export default function TrialPage() {
	try {
		let data = JSON.parse(readFileSync("./data/categories.json", "utf-8"));
		let patient_data = JSON.parse(readFileSync("./data/patients.json", "utf-8"));
		let patients = parsePatients(patient_data.patients);

		let filters: Array<FilterSchema> = data.filters.map((category: any) => {
			let type = getKind(category.type);
			if (type === undefined) return undefined;

			switch (type) {
				case FilterKind.Range: {
					return {
						name: category.name,
						type: type,
						min: category.min,
						max: category.max,
					}
				}
				default: {
					return {
						name: category.name,
						type: type,
						options: category.options,
					}
				}
			}
		})

		return <Dash filters={filters.filter((x: any) => x !== undefined)} patients={patients} />;
	} catch (e) {
		console.log(e);
	}
}
