import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#ffcd56",
          "#ff6384",
          "#36a2eb",
          "#fd6b19",
          "#eb8034",
          "#5edb4b",
          "#4bdbd9",
        ],
      },
    ],
  });

  useEffect(() => {
    axios.get("http://localhost:5000/budget").then((res) => {
      const labels = res.data.myBudget.map((item) => item.title);
      const data = res.data.myBudget.map((item) => item.budget);
      setChartData((prev) => ({
        ...prev,
        labels,
        datasets: [{ ...prev.datasets[0], data }],
      }));
    });
  }, []);

  return <Pie data={chartData} />;
}
