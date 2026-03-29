import { Trial } from "./types";

export interface TrialProp {
    Trial: Trial
}

export function TrialButton({ Trial }: TrialProp) {
    return <div 
        className="cursor-grab top-0 left-0 bg-light-grey-500 m-2 p-2 h-25">
        <p className="text-sm md:text-base lg:text-2xl text-center">{Trial.name}</p>
    </div>
}