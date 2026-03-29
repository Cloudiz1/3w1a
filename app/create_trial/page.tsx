import { readFileSync } from "fs"
import { FilterKind } from "../types"
import { Dash } from "./Dash"

export type FilterSchema = 
	{
		key: string;
		type: FilterKind.Range;
		min: Number;
		max: Number;
	} |
	{
		key: string;
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

export default function TrialPage() {
	try {
		let data = JSON.parse(readFileSync("./data/categories.json", "utf-8"));
		let filters: Array<FilterSchema> = data.filters.map((category: any) => {
			let type = getKind(category.type);
			if (type === undefined) return undefined;

			switch (type) {
				case FilterKind.Range: {
					return {
						key: category.key,
						type: type,
						min: category.min,
						max: category.max,
					}
				}
				default: {
					return {
						key: category.key,
						type: type,
						options: category.option,
					}
				}
			}
		})

		return <Dash defaultFilters={filters.filter((x: any) => x !== undefined)} />
	} catch (e) {
		console.log(e);
	}

}
