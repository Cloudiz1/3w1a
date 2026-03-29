"use client"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);
export interface ScatterPlotProps {
    patients: any,
    indep: string,
    dep: string,
}
export function ScatterPlot({ patients, indep, dep }: ScatterPlotProps) {
    const points: [number, number][] = [];
    let xaxis = [Infinity, -Infinity];
    let yaxis = [Infinity, -Infinity];
    for (const person of patients) {
        // console.log(person);
        if (indep in person.attributes && dep in person.attributes) {
            let x = person.attributes[indep].value;
            let y = person.attributes[dep].value;
            points.push([x, y]);
            if (x < xaxis[0]) xaxis[0] = x;
            if (x > xaxis[1]) xaxis[1] = x;
            if (y < yaxis[0]) yaxis[0] = y;
            if (y > yaxis[1]) yaxis[1] = y;
        }
    }
    // console.log(indep, dep);
    // console.log(points);

    return <div className="w-full h-64 bg-white p-4 rounded-xl">
        <Scatter
            options={{
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: indep,
                        },
                        min: xaxis[0] - 0.1 * (xaxis[1] - xaxis[0]),
                        max: xaxis[1] + 0.1 * (xaxis[1] - xaxis[0]),
                    },
                    y: {
                        title: {
                            display: true,
                            text: dep,
                        },
                        min: yaxis[0] - 0.1 * (yaxis[1] - yaxis[0]),
                        max: yaxis[1] + 0.1 * (yaxis[1] - yaxis[0]),
                    },
                }
            }}
            data={{
                datasets: [{
                    label: `${dep} vs ${indep}`,
                    data: points,
                    pointBackgroundColor: "rgba(255, 0, 0, 255)",
                }],
            }}
        />
    </div>;
}
