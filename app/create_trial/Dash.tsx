"use client"
import type { FilterProp } from "./filter.tsx"
import { Filter, AppliedFilter } from "./filter"
import { useState } from "react"
import { FilterSchema } from "./page"

interface DashProp {
	defaultFilters: Array<FilterSchema>;
}

export function Dash({ defaultFilters: filters }: DashProp) {
	let [appliedFilters, setAppliedFilters] = useState<Array<FilterProp>>([]);

    return <div className="flex w-auto h-dvh overflow-hidden">
        <div className="top-0 left-0 flex-1 h-dvh p-2 overflow-y-scroll bg-blue-500 flex flex-col border-solid border-r-2 border-black"> {/* sidebar */}
			{filters.map((filter, i) => {
				return <Filter key={i} name={filter.key} kind={filter.type} />
			})}
		</div>
		{/* filters */}
		<div 
			onDragOver={(e) => e.preventDefault()}
			onDrop={(e) => {
				const data = JSON.parse(e.dataTransfer.getData("filter"));
				if (!appliedFilters.some(f => data.name === f.name)) {
					setAppliedFilters((prev) => [...prev, data]);
				}
			}}
			className="top-0 left-0 flex-9 h-dvh p-2 overflow-y-scroll bg-blue-500 border-solid border-r-2 border-black flex flex-wrap"
		> 
			{appliedFilters.map((filter, i) => {
				return <AppliedFilter key={i} name={filter.name} kind={filter.kind} />
			})}
		</div>
		<div className="top-0 left-0 flex-4 h-dvh p-2 bg-blue-500"> {/* right bar */}
		</div>
	</div>
}

