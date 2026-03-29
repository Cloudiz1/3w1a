import { CreateTrialButton } from "./trials";
import { getTrials } from "./trial";
import { Trial } from "./types";

export default function homePage() {
    return <div className="master">
        <div className="editDiv"><CreateTrialButton/><UpdatePatient/></div>
        <div className="viewDiv">
            {getTrials.map((trial: Trial, i: number) => {
                return <Trial key={i} name={trial.name} />
                    })}
        </div>
        </div>
}