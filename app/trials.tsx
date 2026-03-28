"use client"
import { useState } from "react";

export function CreateTrialButton() {
    const [showCreation, setShowCreation] = useState(false);
    return <>
        <button className="text-4xl" onClick={() => setShowCreation(true)}>+</button>
        {showCreation && <TrialCreationMenu setShowCreation={setShowCreation} />}
    </>;
}

interface TrialCreationMenuProps {
    setShowCreation: (value: boolean) => void;
}
function TrialCreationMenu({ setShowCreation }: TrialCreationMenuProps) {
    return <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white w-1/6 h-1/6 rounded-xl flex flex-col">
            <div className="flex justify-end">
                <button onClick={() => setShowCreation(false)} className="text-red-500 pr-2">x</button>
            </div>
        </div>
    </div>;
}
