import React, { useState, useEffect } from 'react';
import TransactionForm from './TransactionFile';
import TransactionList from './TransactionList';
import Chart from './Chart';

const HomePage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(savedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const balance = income - expenses;

  const chartData = {
    labels: ['January', 'February', 'March', 'April','May','June','July','August',
      'September','October','November','December'
    ], 
    income: [income, income, income, income,income, income, income, income],
    expenses: [expenses, expenses, expenses, expenses,expenses, expenses, expenses, expenses],
    balance: [balance, balance, balance, balance,balance, balance, balance, balance],
  };

  return (
    <div>
      <h1>Personal Finance Management</h1>
      <TransactionForm addTransaction={addTransaction} />
      <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
      <div>
        <h2>Summary</h2>
        <p>Total Income: {income}</p>
        <p>Total Expenses: {expenses}</p>
        <p>Balance: {balance}</p>
      </div>
      <div>
        <Chart data={chartData} />
      </div>
    </div>
  );
};

export default HomePage;
