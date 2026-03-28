"use client"
import type { FilterKind } from "./types.js"

export interface FilterProp {
	name: String,
	kind: FilterKind,
}

export function Filter({name, kind}: FilterProp) {
	return <div 
		draggable
		onDragStart={(e) => {
			e.dataTransfer.setData("filter", JSON.stringify({ name, kind }))
		}}
		className="cursor-grab top-0 left-0 bg-red-500 m-2 p-2 h-25">

		<p className="text-sm md:text-base lg:text-2xl text-center">{name}</p>
	</div>
}

export function AppliedFilter({name, kind}: FilterProp) {
	return <div className="h-1/4 w-1/5 shrink-0 m-2 bg-red-500">
		<p>{name}</p>
		<p>{kind}</p>
	</div>
}
