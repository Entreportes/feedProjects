import React, { useState, useEffect } from 'react';
import { number } from 'yup';
import styles from './Dashboard.module.css';
import SalesChart, { SalesData } from './graphic/SalesChart';
import ToRecieve from './graphic/ToRecieve';

interface Data {
  id: number;
  date: string;
  description: string;
  value: number;
  category: string;
}

export function Dashboard(){
  const [data, setData] = useState<Data[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

 
  const salesData = {
    cash: 5000,
    credit: 8000,
  };
  const sampleData: SalesData[] = [
    { month: 'Jan', cash: 5000, credit: 8000 },
    { month: 'Feb', cash: 7500, credit: 10000 },
    { month: 'Mar', cash: 10000, credit: 12000 },
    { month: 'Apr', cash: 12500, credit: 14000 },
    { month: 'May', cash: 15000, credit: 16000 },
    { month: 'Jun', cash: 17500, credit: 18000 },
    { month: 'Jul', cash: 20000, credit: 20000 },
    { month: 'Aug', cash: 22500, credit: 22000 },
    { month: 'Sep', cash: 25000, credit: 24000 },
    { month: 'Oct', cash: 27500, credit: 26000 },
    { month: 'Nov', cash: 30000, credit: 28000 },
    { month: 'Dec', cash: 32500, credit: 30000 },
  ];
  function loadData() {
    const response = [
      {
        id: 1,
        date: '2022-01-01',
        description: 'Salary payment',
        value: 5000,
        category: 'Income'
      },
      {
        id: 2,
        date: '2022-01-02',
        description: 'Office rent',
        value: 2000,
        category: 'Expense'
      },
      {
        id: 3,
        date: '2022-01-03',
        description: 'Utilities bill',
        value: 500,
        category: 'Expense'
      },
      {
        id: 4,
        date: '2022-01-04',
        description: 'Business trip to São Paulo',
        value: 1800,
        category: 'Expense'
      }
    ]
    
    setData(response);

    const expenses = data
      .filter((item: { category: string; }) => item.category === 'Expense')
      .reduce((prev: any, current: { value: any; }) => prev + current.value, 0);
    setTotalExpenses(expenses);

    const income = data
      .filter((item: { category: string; }) => item.category === 'Income')
      .reduce((prev: any, current: { value: any; }) => prev + current.value, 0);
    setTotalIncome(income);
  }

  useEffect(() => {
    
    loadData();
  }, []);

  return (
    <div className={styles.container}>
      <SalesChart
        salesData={sampleData}
      />
      
      <div>
        <ToRecieve
          data={salesData}
        />

      </div>
    </div>
  );
};

