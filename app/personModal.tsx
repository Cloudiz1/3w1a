"use client"

import { useState } from "react";

export function PersonEditButton() {
    const [showPersonEditor, setShowPersonEditor] = useState(false);
    return <>
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
            }} className="bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-bold py-4 px-6 rounded-xl transition-colors shadow-md text-2xl" 
            onClick={() => setShowPersonEditor(true)}>Update Patient</button>
        {showPersonEditor && <EditPerson setShowCreation={setShowPersonEditor} />}
    </>;
}

export interface EditPersonProps {
    setShowCreation: (value: boolean) => void,
}
export function EditPerson({ setShowCreation: setShowEditor }: EditPersonProps) {
    const [idValue, setIdValue] = useState(0);
    const [attrValue, setAttrValue] = useState("");
    const [valueValue, setValueValue] = useState("");

    return <div style={{backgroundColor: "lightgray", width:"25%", height:"25%"}} className="fixed inset-0 flex items-center justify-center">
        <div>
            <div className="flex justify-end">
                <button onClick={() => setShowEditor(false)} className="text-red-500 pr-2">x</button>
            </div>
            <input
                type="text"
                placeholder="Enter ID Number..."
                className={isNaN(idValue) ? "text-red-500" : "text-black"}
                onChange={(e) => {
                    setIdValue(parseInt(e.target.value));
                }}>
            </input>
            <div className="flex">
                <input
                    type="text"
                    placeholder="Enter Attribute..."
                    className="text-black"
                    onChange={(e) => {
                        setAttrValue(e.target.value);
                    }}>
                </input>
                <input
                    type="text"
                    placeholder="Enter Value..."
                    className="text-black"
                    onChange={(e) => {
                        setValueValue(e.target.value);
                    }}>
                </input>
            </div>
            <button className="text-black" onClick={() => {
                setShowEditor(false);

                fetch("/api/patient", {
                    method: "POST",
                    body: JSON.stringify({
                        "id": idValue,
                        "attr": attrValue,
                        "value": valueValue,
                    }),
                });
            }}>Update Patient</button>
        </div>
    </div>
}
