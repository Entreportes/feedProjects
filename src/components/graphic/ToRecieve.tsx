import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styles from './ToRecieve.module.css'

ChartJS.register(ArcElement, Tooltip, Legend);

interface SalesData {
  cash: number;
  credit: number;
}

interface ToReciveProps {
  data: SalesData;
}

const ToRecieve: React.FC<ToReciveProps> = ({ data }) => {
  const chartData = {
    labels: ['À vista', 'À prazo'],
    datasets: [
      {
        data: [data.cash, data.credit],
        backgroundColor: ['#8d8d99', '#e1e1e6'],
        borderColor: 'transparent',
        // borderColor: '#00875f',
        
      },
    ],
    
  };

  const chartOptions = {
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      // position: 'top',
      
      labels: {
        fontSize: 14,
        usePointStyle: true,
      },
    },
  };

  return (
    <div className={styles.container}>
      <h4>Perfil de Vendas</h4>
        <Doughnut data={chartData} options={chartOptions} />
        <h4>Total a receber: {data.cash+data.credit}</h4>
    </div>
  )
};

export default ToRecieve;