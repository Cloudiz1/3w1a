"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function UpdatePeop() { //generate a component
    const [showCreation, setShowCreation] = useState(false);
    return <>
        <button className="text-4xl" onClick={() => setShowCreation(true)}>Update Patient</button>
        {showCreation && <TrialCreationMenu setShowCreation={setShowCreation} />}
    </>;
}

interface TrialCreationMenuProps { 
    setShowCreation: (value: boolean) => void;
}
function TrialCreationMenu({ setShowCreation }: TrialCreationMenuProps) { //follow up component
    const [inputValue, setInputValue] = useState("");
    const router = useRouter();
    const params = new URLSearchParams();
    return <div className="fixed inset-0 flex items-center justify-center">
        <div className="p-2 bg-white rounded-xl flex flex-col">
            <div className="flex justify-end">
                <button onClick={() => setShowCreation(false)} className="text-red-500 pr-2">x</button>
            </div>
            <input
                type="text"
                placeholder="Enter New Trial Name..."
                className="text-black"
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}>
            </input>
            <button className="text-black" onClick={() => {
                setShowCreation(false);
                params.set("name", inputValue);
                router.push(`/create_trial?${params.toString()}`);
            }}>Create New Trial</button>
        </div>
    </div>;
}
