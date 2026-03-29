"use client"
import { useState } from "react";
import { AttKind, Attribute, Patient } from "../types";

export interface EditTrialDataProps {
    patient: Patient;
}
export function EditTrialData({ patient }: EditTrialDataProps) {
    const [attrValue, setAttrValue] = useState("");
    const [valueValue, setValueValue] = useState("");

    return <div className="fixed inset-0 flex m-2">
        <div className="p-2 bg-red-500 rounded-xl flex flex-col">
            <div className="text-black"><u>{patient.name}</u></div>
            <div className="text-black">id: {patient.id}</div>
            {patient.attributes.entries().map((x) => { return <div className="text-black">{x[0]}: {x[1].value.toString()}</div>; })}
            <div className="text-black">notes: "{patient.notes}"</div>
            <button className="text-black" onClick={() => {
                fetch("/api/patient", {
                    method: "POST",
                    body: JSON.stringify({
                        "attr": attrValue,
                        "value": valueValue,
                    }),
                });
            }}>Update Patient</button>
        </div>
    </div>
}

export default function Main() {
    let a: Map<String, Attribute> = new Map();
    a.set("weight", { value: 190, type: AttKind.Number });
    let p: Patient = {
        name: "Blake B. Lake",
        id: "1",
        attributes: a,
        notes: "BBL",
    };
    return <EditTrialData patient={p} />;
}
