import "./ChartView.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import type { HistoryRecord } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type ChartViewProps = {
  history: HistoryRecord[];
};

function ChartView({ history }: ChartViewProps) {
  const labels = history.map((record) =>
    new Date(record.created_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  );

  const cumulativeValues = history.map((record) => record.cumulative_sum);

  const inputValues = history.map((record) => record.value);

  const data = {
    labels,
    datasets: [
      {
        label: "Input Value",
        data: inputValues,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.35,
        pointRadius: 5,
      },
      {
        label: "Cumulative Sum",
        data: cumulativeValues,
        borderColor: "#16a34a",
        backgroundColor: "#16a34a",
        tension: 0.35,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top" as const,
      },

      title: {
        display: true,
        text: "Running Sum Over Time",
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-card">
      <Line data={data} options={options} />
    </div>
  );
}

export default ChartView;
