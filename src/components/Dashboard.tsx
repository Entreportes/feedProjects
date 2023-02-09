import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

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
      <h2>Accounting Dashboard</h2>
      <h3>Total Income: {totalIncome}</h3>
      <h3>Total Expenses: {totalExpenses}</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Value</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.description}</td>
              <td>{item.value}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

