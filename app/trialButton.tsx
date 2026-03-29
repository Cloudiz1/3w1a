"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function CreateTrialButton() {
    const [showCreation, setShowCreation] = useState(false);
    return <>
        <button className="text-4xl" onClick={() => setShowCreation(true)}>Create Trial</button>
        {showCreation && <TrialCreationMenu setShowCreation={setShowCreation} />}
    </>;
}

interface TrialCreationMenuProps {
    setShowCreation: (value: boolean) => void;
}
function TrialCreationMenu({ setShowCreation }: TrialCreationMenuProps) {
    const [inputValue, setInputValue] = useState("");
    const [infoValue, setInfoValue] = useState("");
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
            <div className="text-red-500">{infoValue}</div>
            <button className="text-black" onClick={() => {
                if (!inputValue.length) {
                    setInfoValue("No name specified.");
                } else {
                    setInfoValue("");
                    params.set("name", inputValue);
                    router.push(`/create_trial?${params.toString()}`);
                    setShowCreation(false);
                }
            }}>Create New Trial</button>
        </div>
    </div>;
}
