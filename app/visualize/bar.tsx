"use client"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export interface BarPlotProps {
    patients: any,
    attr: string,
    flip?: boolean
}
export function BarPlot({ patients, attr, flip=false }: BarPlotProps) {
    let data = {
        labels: [] as string[],
        datasets: [{
            label: attr,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
            data: [] as number[],
        }],
    };

    for (const person of patients) {
        if (attr in person.attributes) {
            const label: string = person.attributes[attr].value;
            const index = data.labels.indexOf(label);
            if (index < 0) {
                data.labels.push(label);
                data.datasets[0].data.push(1);
            } else {
                data.datasets[0].data[index]++; 
            }
        }
    }

    return <Bar data={data} options={{ indexAxis: flip ? "y" : "x" }}/>
}

export interface DoubleBarProps {
    patients: any[],
    indep: string,
    dep: string,
}
export function DoubleBar({ patients, indep, dep }: DoubleBarProps) {
    const indepCategories = [...new Set(patients.map(p => p.attributes[indep]?.value))].filter(Boolean);
    const depCategories = [...new Set(patients.map(p => p.attributes[dep]?.value))].filter(Boolean);

    const datasets = depCategories.map((depVal, i) => {
        return {
            label: String(depVal),
            data: indepCategories.map(indepVal => {
                return patients.filter(p => 
                    p.attributes[indep]?.value === indepVal && 
                    p.attributes[dep]?.value === depVal
                ).length;
            }),
            backgroundColor: `hsla(${(i * 360) / depCategories.length}, 70%, 60%, 0.7)`,
        };
    });

    const data = {
        labels: indepCategories,
        datasets: datasets,
    };

    const options = {
        responsive: true,
        scales: {
            x: { stacked: true },
            y: { stacked: true },
        },
        plugins: {
            title: {
                display: true,
                text: `${dep} vs ${indep}`,
            },
        },
    };

    return <Bar data={data} options={options} />;
}
