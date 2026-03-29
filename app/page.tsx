import { CreateTrialButton } from "./trialButton";
import { getTrials } from "./trialLogic";
import { Trial } from "./types";
import { TrialButton } from  "./trial";
import { PersonEditButton } from "./personModal";
// import { UpdatePeop } from "./updatePeop";

export default function homePage() {
    return <div className="master">
        <div className="editDiv"><CreateTrialButton/><PersonEditButton/></div>
        <div className="viewDiv">
            {getTrials().map((trial: Trial, i: number) => {
                return <TrialButton key={i} Trial={trial} />
                    })}
        </div>
        </div>
}
