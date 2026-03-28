import * as ty from "./types";
import * as trials from "./dat/trial.json" with {type:'json'};

export function CreateTrial(name){
    const trial: ty.Trial = {
        name: name,
        filters: new Map<String, ty.FilterKind>(),
        eligible: Array


    };
    return trial
}