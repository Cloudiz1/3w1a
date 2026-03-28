"use client"
import { useState } from "react";

export function CreateTrialButton() {
    const [showCreation, setShowCreation] = useState(false);
    return <>
        <button className="text-4xl" onClick={() => setShowCreation(true)}>+</button>
        {showCreation && <TrialCreationMenu setShowCreation={setShowCreation} />}
    </>;
}

function TrialCreationMenu(setShowCreation) {
    return <div className="">
    </div>;
}
