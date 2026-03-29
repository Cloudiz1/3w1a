"use client"
import { FilterKind } from "../types"
import { FilterSchema } from "./page"
import RangeSlider from "../../inputs/RangeSlider"
import Categorical from "../../inputs/Categorical"
import MultiSelect from "../../inputs/MultiSelect"

export interface FilterProp {
    filter: FilterSchema
}

export function Filter({ filter }: FilterProp) {
	return <div style={{backgroundColor: "#70FFB4"}}
		draggable
		onDragStart={(e) => {
			e.dataTransfer.setData("filter", JSON.stringify(filter))
		}}
		className="cursor-grab top-0 left-0 bg-red-500 m-2 p-2 h-25">

        <p className="text-sm md:text-base lg:text-2xl text-center select-none">{filter.name}</p>
    </div>
}

interface AppliedFilterProp {
    filter: FilterSchema,
    data_ref: any,
}

export function AppliedFilter({ filter, data_ref }: AppliedFilterProp) {
    console.log(filter);
    let inputForm;
    switch (filter.type) {
        case FilterKind.Range: {
            inputForm = <RangeSlider 
                min={filter.min} 
                max={filter.max}
                onChange={(range: any) => data_ref.current.set(filter.name, range)}
            />;
            break;
        }
        case FilterKind.Categorical: {
            inputForm = <Categorical
                options={filter.options}
                onChange={(option: any) => data_ref.current.set(filter.name, option)}
            />;
            break;
        }
        case FilterKind.MultiSelect: {
            inputForm = <MultiSelect
                options={filter.options}
                onChange={(options: Array<string>) => data_ref.current.set(filter.name, options)}
            />
        }
    }

    return <div className="h-1/4 w-94/400 shrink-0 m-2 p-2 pl-6 pr-6 bg-red-500">
        <p className="select-none text-center select-none h-2/4 mt-3 text-3xl">{filter.name}</p>
        {inputForm}
    </div>
}
