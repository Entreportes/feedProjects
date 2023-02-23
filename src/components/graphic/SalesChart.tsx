import React from "react";
import styles from './SalesChart.module.css'
import { Chart } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
  } from 'chart.js';


  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
  );

  export interface SalesData {
    month: string,
    cash: number,
    credit: number,
  }

interface ChartProps {
  salesData: SalesData[];
}

const SalesChart: React.FC<ChartProps> = ({ salesData }) => {
  const labels = salesData.map((data) => data.month);
  const cashData = salesData.map((data) => data.cash);
  const creditData = salesData.map((data) => data.credit);
  const totalData = salesData.map((data) => data.cash + data.credit);
  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: false,
        
      },
      scales: {
        xAxes: [
            {
              ticks: {
                autoSkip: false,
                maxRotation: 90,
              },
            },
          ],
      },
      y: {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };
  const data = {
    labels: labels,
    options: options,
    datasets: [
      {
        type: "bar" as const,
        label: "Venda à vista",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: cashData,
      },
      {
        type: "bar" as const,
        label: "Venda a prazo",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: creditData,
      },
      {
        type: "line" as const,
        label: "Total",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 2,
        fill: false,
        data: totalData,
      },
    ],
  };

 

  return (
    <div className={styles.container}>
        <h5>Faturamento</h5>
      <Chart type='bar' data={data} width={800} height={200} />
    </div>
  );
};

export default SalesChart;
