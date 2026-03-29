"use Server";
import { useState } from "react";
import { CreateTrial } from "./trial";

export function CreateTrialButton() {
    const [showCreation, setShowCreation] = useState(false);
    return <>
        <button className="text-4xl" onClick={() => setShowCreation(true)}>+</button>
        {showCreation && <TrialCreationMenu setShowCreation={setShowCreation} />}
    </>
}

interface TrialCreationMenuProps {
    setShowCreation: (value: boolean) => void;
}
function TrialCreationMenu({ setShowCreation }: TrialCreationMenuProps) {
    const [inputValue, setInputValue] = useState("");
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
            }}>Create New Trial</button>
        </div>
    </div>
}
