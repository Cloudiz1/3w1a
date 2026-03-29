"use Clinet";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function CreateTrialButton() {
    const [showCreation, setShowCreation] = useState(false);
    return (
        <>
            <button style={{ 
                width: '95%', 
                backgroundColor: '#70FFB4',  
                color:"black",
                height: "40%",
                display: 'flex',
                borderRadius: "15px",
                flexDirection: 'column',
                gap: '20px',
                marginBottom: "5%"
            }}   className="bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-bold py-4 px-6 rounded-xl transition-colors shadow-md text-2xl" 
                onClick={() => setShowCreation(true)}
            >
                Create Trial
            </button>
            {showCreation && <TrialCreationMenu setShowCreation={setShowCreation} />}
        </>
    );
}

interface TrialCreationMenuProps {
    setShowCreation: (value: boolean) => void;
}
function TrialCreationMenu({ setShowCreation }: TrialCreationMenuProps) {
    const [inputValue, setInputValue] = useState("");
    const [infoValue, setInfoValue] = useState("");
    const router = useRouter();
    const params = new URLSearchParams();
    return <div style={{backgroundColor: "lightgray", width:"25%", height:"25%"}}
    className="fixed inset-0 bg-light_gray flex items-center justify-center">
        <div>
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
