import { DoubleBar, BarPlot } from "./bar";
import BoxPlot from "./box";
import { Histogram } from "./hist";
import { ScatterPlot } from "./scatter";
// import * as fs from "fs";

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

// export default function Main() {
//     const data = JSON.parse(fs.readFileSync("./data/patients.json", "utf8"));
//     return <>
//         {display_cont_cont(data.patients, "height", "weight")}
//         {display_disc_cont(data.patients, "iron", "height")}
//         {display_disc_disc(data.patients, "iron", "metabolism")}
//         {display_disc(data.patients, "iron")}
//         {display_cont(data.patients, "weight", 16)}
//     </>;
// }
