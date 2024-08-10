import React from 'react';

const TransactionList = ({ transactions, deleteTransaction }) => {
  return (
    <ul>
      {transactions.map((transaction, index) => (
        <li key={index}>
          {transaction.type}: {transaction.amount} - {transaction.category} - {transaction.date} - {transaction.description}
          <button onClick={() => deleteTransaction(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
