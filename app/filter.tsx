import type { FilterKind } from "./trials.d.ts"

export interface FilterProp {
	name: String,
	kind: FilterKind,
}

export function Filter({name, kind}: FilterProp) {
	return <div className="top-0 left-0 bg-red-500 m-2 p-2 h-25">
		<p className="text-center text-2xl">{name}</p>
	</div>
}
