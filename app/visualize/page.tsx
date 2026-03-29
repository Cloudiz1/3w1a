import { FilterSchema } from "../create_trial/page";
import { AttKind, Attribute, Patient } from "../types";
import { DoubleBar, BarPlot } from "./bar";
import BoxPlot from "./box";
import { Histogram } from "./hist";
import { ScatterPlot } from "./scatter";
import * as fs from "fs";

// functions are labelled x then y
export function display_cont_cont(patients: any, indep: string, dep: string) {
    return <ScatterPlot patients={patients} indep={indep} dep={dep} />;
}
export function display_disc_cont(patients: any, indep: string, dep: string) {
    return <BoxPlot patients={patients} indep={indep} dep={dep} />;
}
export function display_cont_disc(patients: any, indep: string, dep: string) {
    return <BoxPlot patients={patients} indep={dep} dep={indep} flip={true} />;
}
export function display_disc_disc(patients: any, indep: string, dep: string) {
    return <DoubleBar patients={patients} indep={indep} dep={dep} />;
}

export function display_disc(patients: any, attr: string) {
    return <BarPlot patients={patients} attr={attr} />;
}
export function display_cont(patients: any, attr: string, binCount: number = 10) {
    return <Histogram patients={patients} attr={attr} binCount={binCount} />;
}

export default function Main() {
    const raw_patients: Array<Patient> = JSON.parse(fs.readFileSync("./data/patients.json", "utf8")).patients;
    const trial = JSON.parse(fs.readFileSync("./data/trials.json", "utf8")).trials[0];
    console.log("pre filter i am typing words");
    console.log(trial);
    const filtered_patients: Array<Patient> = [];
    for (const pat of raw_patients) {
        for (const fil of Object.entries(trial.filters)) {
            let attr_name = fil[0].toLowerCase();
            // console.log(attr_name);
            let fval = fil[1] as any;
            // console.log(pat.attributes[attr_name]);

            if (attr_name in pat.attributes) {
                let attr = pat.attributes[attr_name] as Attribute; // cant be undefined
                switch (attr.type) {
                    case AttKind.Number: if (fval[0] <= attr.value && attr.value <= fval[1]) filtered_patients.push(pat); break;
                    case AttKind.String: if (fval == attr.value) filtered_patients.push(pat); break;
                    case AttKind.Array: if (fval.some((x: any) => x in attr.value)) filtered_patients.push(pat); break;
                }
            }
        }
    }
    console.log("post filter:", filtered_patients);

    let indepIsCont = isCont(filtered_patients, trial.independent);
    if (trial.dependent.length == 0) {
        if (indepIsCont) {
            return <div key={Math.random()}> {display_cont(filtered_patients, trial.independent, 16)}; </div>
        } else {
            return <div key={Math.random()}> {display_disc(filtered_patients, trial.independent)}; </div>
        }
    } else {
        return trial.dependent.map((dep: any, i: number) => {
            console.log(trial.independent, dep);
            let depIsCont = isCont(filtered_patients, dep);
            if (depIsCont && indepIsCont) {
                return <div key={i}>{display_cont_cont(filtered_patients, trial.independent, dep)}</div>;
            } else if (depIsCont && !indepIsCont) {
                return <div key={i}>{display_disc_cont(filtered_patients, trial.independent, dep)}</div>;
            } else if (!depIsCont && indepIsCont) {
                return <div key={i}>{display_cont_disc(filtered_patients, trial.independent, dep)}</div>;
            } else if (!depIsCont && !indepIsCont) {
                return <div key={i}>{display_disc_disc(filtered_patients, trial.independent, dep)}</div>;
            }
        });
    }
}

function isCont(patients: Patient[], type: string) {
    for (const pat of patients) {
        if (Object.keys(pat.attributes).includes(type)) {
            return pat.attributes[type]?.type == AttKind.Number;
        }
    }
}
