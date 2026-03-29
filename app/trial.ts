"use Sever";
import * as ty from "./types";
import * as fs from "node:fs";


export function CreateTrial(name: string){
    const datString = fs.readFileSync('./dat/trials.json', 'utf8');
    let datJSON = JSON.parse(datString);
    const trial: ty.Trial = {
        name: name,
        filters: new Map<String, ty.FilterKind>(),
        eligible: new Array<ty.Patient>,
        consented: new Array<ty.Patient>,
        trialData: new Map<String, ty.TrialData>
    };
    datJSON.trials.append(trial);
    const writeString = JSON.stringify(datJSON, null, 2);
    fs.writeFileSync('./dat/trials.json', writeString, 'utf8');
}