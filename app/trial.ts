import * as tr from "./trials";
import * as trials from "./dat/trial.json" with {type:'json'};

export function CreateTrial(name){
    return new tr.Trial;
}