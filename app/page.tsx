<<<<<<< Updated upstream
import type { FilterProp } from "./filter.tsx";
import { Filter } from "./filter";
import { FilterKind } from "./types";
import { CreateTrialButton } from "./trials";
=======
"use client"
import type { FilterProp } from "./filter.tsx"
import { Filter, AppliedFilter } from "./filter"
import { FilterKind } from "./trials"
import { useState } from "react"
>>>>>>> Stashed changes

export default function TrialPage() {
	let [appliedFilters, setAppliedFilters] = useState<Array<FilterProp>>([]);
	let defaultFilters: Array<FilterProp> = [
		{
			name: "Age",
			kind: FilterKind.Range,
		},
		{
			name: "Weight",
			kind: FilterKind.Range,
		},
		{
			name: "Height",
			kind: FilterKind.Range,
		},
<<<<<<< Updated upstream
=======
		{
			name: "Gender",
			kind: FilterKind.Range,
		},
>>>>>>> Stashed changes
	];

<<<<<<< HEAD
	return <div className="flex w-auto h-dvh overflow-hidden">
		<div className="top-0 left-0 flex-1 h-dvh p-2 overflow-y-scroll bg-blue-500 flex flex-col border-solid border-r-2 border-black"> {/* sidebar */}
<<<<<<< Updated upstream
=======
	return <div className="flex h-dvh overflow-hidden">
		<div className="top-0 left-0 w-75 h-auto p-2 m-2 flex-none overflow-y-scroll bg-blue-500 flex flex-col"> {/* sidebar */}
            <CreateTrialButton />
>>>>>>> 72d32793a63345d792ffd9ac639a3dc84d8c8f77
			{filters.map((filter, i) => {
=======
			{defaultFilters.map((filter, i) => {
>>>>>>> Stashed changes
				return <Filter key={i} name={filter.name} kind={filter.kind} />
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
	</div>;
}
