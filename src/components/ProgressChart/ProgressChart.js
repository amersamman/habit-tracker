// ProgressChart.js
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,    // Import CategoryScale
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // For date handling
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,    // Register CategoryScale
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ProgressChart({ habits }) {
  const dates = [...new Set(habits.flatMap((habit) => habit.history))].sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const datasets = habits.map((habit) => ({
    label: habit.name,
    data: dates.map((date) =>
      habit.history.includes(date) ? 1 : 0
    ),
    fill: false,
  }));

  const data = {
    labels: dates,
    datasets,
  };

  return (
    <div>
      <h2>Progress Chart</h2>
      <Line data={data} />
    </div>
  );
}

export default ProgressChart;
