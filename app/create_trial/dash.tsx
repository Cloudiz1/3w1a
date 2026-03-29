"use client"
import { Filter, AppliedFilter } from "./filter"
import { useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { FilterSchema } from "./page"

interface DashProp {
	filters: Array<FilterSchema>;
}

export function Dash({ filters }: DashProp) {
	let [appliedFilters, setAppliedFilters] = useState<Array<FilterSchema>>([]);
	let [independent, setIndependent] = useState<FilterSchema | undefined>();
	let [dependent, setDependent] = useState<Array<FilterSchema>>([]);
	let data_filters = useRef<Map<string, any>>(new Map);
	const searchParams = useSearchParams();

    return <div className="flex w-auto h-dvh overflow-hidden">
        <div className="top-0 left-0 flex-1 h-dvh p-2 overflow-y-scroll bg-blue-500 flex flex-col border-solid border-r-2 border-black"> {/* sidebar */}
			{filters.map((filter: FilterSchema, i) => {
				return <Filter key={i} filter={filter} />
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
			className="top-0 left-0 flex-7 h-dvh p-2 overflow-y-scroll bg-blue-500 border-solid border-r-2 border-black flex flex-wrap content-start"
		> 
			{appliedFilters.map((filter, i) => {
				return <AppliedFilter key={i} filter={filter} data_ref={data_filters} />
			})}
		</div>
		<div className="top-0 left-0 flex-3 h-dvh bg-blue-500 flex flex-col min-h-0 min-w-0">
			<div className="top-0 left-0 flex-1 flex flex-col">
				<div className="top-0 left-0 m-5 mb-2 flex h-1/3">
					<p className="text-2xl text-center pt-8 flex-8 mr-2">Independent Variable</p>
					<div 
						onDragOver={(e) => e.preventDefault()}
						onDrop={(e) => {
							const data = JSON.parse(e.dataTransfer.getData("filter"));
							setIndependent(data);
						}}
						className="top-0 left-0 bg-red-500 flex-3"
					>
						{independent && <p className="text-center pt-8 text-xl">{independent.name}</p>}
					</div>
				</div>
				<div className="text-lg flex-1 flex flex-col min-h-0">
					<p className="bg-purple-500 text-center text-2xl mb-2 py-2">Dependent Variables</p>
					<div
						className="bg-pink-500 flex-1 min-w-0 overflow-x-auto flex items-start gap-2 p-2"
						onDragOver={(e) => e.preventDefault()}
						onDrop={(e) => {
						const data = JSON.parse(e.dataTransfer.getData("filter"));
							if (!dependent.some(f => data.name === f.name)) {
								setDependent((prev) => [...prev, data]);
							}
						}}
					>
						{dependent.map((variable, i) => (
							<div
								key={i}
								className="w-48 flex-shrink-0 bg-red-500 p-2 rounded h-full text-center pt-9"
							>

							<p className="text-xl">{variable.name}</p>
						</div>
						))}
					</div>
				</div>
			</div>
			<div className="top-0 left-0 flex-2 m-2"></div>
			<button onClick = { async () => {
				if (independent === undefined) {
					alert!("You need to input an independent variable!");
					return;
				}
				
				const name = searchParams.get("name");
				fetch("/api/trial", {
					method: "POST",
					body: JSON.stringify({
						"name": name,
						"filters": Object.fromEntries(data_filters.current),
						"independent": independent.name,
						"dependent": dependent.map((variable) => variable.name),
					})
				})
			}} className="h-12 bg-red-500 text-lg">Confirm</button>
		</div>
	</div>
}

