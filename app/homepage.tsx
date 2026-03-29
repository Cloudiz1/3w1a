import { CreateTrialButton } from "./trials";

export default function homePage() {
    return <div className="master">
        <div className="editDiv"><CreateTrialButton/><UpdatePatient/></div>
        <div className="viewDiv"></div>
        </div>
}