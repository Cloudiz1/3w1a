"use client"
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { BoxPlotController, BoxAndWiskers } from "@sgratzl/chartjs-chart-boxplot";
import { Chart } from 'react-chartjs-2';

ChartJS.register(BoxPlotController, BoxAndWiskers, CategoryScale, LinearScale, Tooltip, Legend);
export interface BoxPlotProps {
    patients: any,
    indep: string,
    dep: string,
    flip?: boolean,
}
export default function BoxPlot({ patients, indep, dep, flip=false }: BoxPlotProps) {
    let data = {
        labels: [] as string[],
        datasets: [{
            label: `${dep} vs ${indep}`,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
            data: [] as any[],
        }],
    };

    for (const person of patients) {
        if (indep in person.attributes && dep in person.attributes) {
            const label: string = person.attributes[indep].value;
            const index = data.labels.indexOf(label);
            if (index < 0) {
                data.labels.push(label);
                data.datasets[0].data.push([person.attributes[dep].value]);
            } else {
                data.datasets[0].data[index].push(person.attributes[dep].value); 
            }
        }
    }

    return <Chart type="boxplot" data={data} options={{
        responsive: true,
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
        },
        indexAxis: flip ? "y" : "x",
    }} />;
}
