"use client"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export interface HistogramProps {
    patients: any,
    attr: string,
    binCount?: number,
}
export function Histogram({ patients, attr, binCount=10 }: HistogramProps) {
    const values = patients
        .map((p: any) => p.attributes[attr]?.value)
        .filter((v: any) => typeof v === 'number');

    if (values.length === 0) return <div>No data available</div>;

    const min = Math.min(...values);
    const max = Math.max(...values);
    
    const range = max - min;
    const step = range === 0 ? 1 : range / binCount;

    const bins = new Array(binCount).fill(0);
    const labels = new Array(binCount).fill("");

    for (let i = 0; i < binCount; i++) {
        const start = min + i * step;
        const end = start + step;
        labels[i] = `${start.toFixed(1)}-${end.toFixed(1)}`;
    }

    for (const val of values) {
        let binIndex = Math.floor((val - min) / step);
        
        if (binIndex >= binCount) binIndex = binCount - 1;
        
        bins[binIndex]++;
    }

    const data = {
        labels: labels,
        datasets: [{
            label: attr,
            data: bins,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
            barPercentage: 1,
            categoryPercentage: 1,
        }],
    };

    const options = {
        scales: {
            y: { beginAtZero: true },
            x: { grid: { display: false } }
        }
    };

    return <Bar data={data} options={options} />;
}
