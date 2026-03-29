"use client"

import { useState } from "react";

export function PersonEditButton() {
    const [showPersonEditor, setShowPersonEditor] = useState(false);
    return <>
        <button className="text-4xl" onClick={() => setShowPersonEditor(true)}>+</button>
        {showPersonEditor && <EditPerson setShowCreation={setShowPersonEditor} />}
    </>;
}

export interface EditPersonProps {
    setShowCreation: (value: boolean) => void,
}
export function EditPerson({ setShowCreation: setShowEditor }: EditPersonProps) {
    const [idValue, setIdValue] = useState(NaN);
    const [attrValue, setAttrValue] = useState("");
    const [valueValue, setValueValue] = useState("");
    const [infoValue, setInfoValue] = useState("");

    return <div className="fixed inset-0 flex items-center justify-center">
        <div className="p-2 bg-white rounded-xl flex flex-col">
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
            <div className="text-red-500">{infoValue}</div>
            <button className="text-black" onClick={() => {
                if (idValue < 0 || isNaN(idValue)) {
                    setInfoValue("ID must be a positive integer.");
                } else if (!attrValue.length) {
                    setInfoValue("No attribute to update.");
                } else if (!valueValue.length) {
                    setInfoValue("No value to update the attribute with.");
                } else {
                    setInfoValue("")
                    fetch("/api/patient", {
                        method: "POST",
                        body: JSON.stringify({
                            "id": idValue,
                            "attr": attrValue,
                            "value": valueValue,
                        }),
                    });
                    setShowEditor(false);
                }

            }}>Update Patient</button>
        </div>
    </div>
}
