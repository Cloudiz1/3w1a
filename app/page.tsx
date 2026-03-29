import { CreateTrialButton, TrialB } from "./trialButton";
import { getTrials } from "./trialLogic";
import { Trial } from "./types";
import { PersonEditButton } from "./personModal";

export default function HomePage() {
    return (
        <div className="master" style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar: createTrial and updatePatient on the left */}
            <div className="editDiv" style={{ 
                paddingTop: "50%",
                width: '25%', 
                backgroundColor: '#e5e5e5',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                
                <CreateTrialButton />
            
                <PersonEditButton />
            </div>

            {/* Main Content: Map of trials on the right */}
            <div className="viewDiv" style={{ 
                flex: 1, 
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                {getTrials().map((trial: Trial, i: number) => {
                    return <TrialB key={i} Trial={trial}/>
                })}
            </div>
        </div>
    );
}
