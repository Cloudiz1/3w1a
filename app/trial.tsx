import { Trial } from "./types";

export interface TrialProp {
    Trial: Trial
}

export function TrialButton({ Trial }: TrialProp) {
    return <div 
        className="top-0 left-0 flex-7 h-dvh p-2 overflow-y-scroll bg-blue-500 border-solid border-r-2 border-black flex flex-wrap content-start"
        style={{
            width: '300px', 
                backgroundColor: '#70FFB4', 
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
        }}>
        <p className="text-sm md:text-base lg:text-2xl text-center">{Trial.name}</p>
    </div>
}