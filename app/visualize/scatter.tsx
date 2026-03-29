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
    for (const person of patients) {
        if (indep in person.attributes && dep in person.attributes) {
            points.push([person.attributes[indep].value, person.attributes[dep].value]);
        }
    }

    return <div className="w-full h-64 bg-white p-4 rounded-xl">
        <Scatter
            options={{
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: indep,
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: dep,
                        },
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
