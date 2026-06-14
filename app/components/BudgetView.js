// app/components/BudgetView.js
"use client";
import React from "react";

export default function BudgetView({ budget, setBudget }) {
  const total = budget?.total || 0;
  const expenses = budget?.expenses || [];
  const spent = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const remaining = total - spent;

  const handleAddExpense = () => {
    const newExpense = {
      id: Date.now().toString(),
      description: "New expense",
      amount: 0,
    };
    setBudget({ ...budget, expenses: [...expenses, newExpense] });
  };

  return (
    <section className="budget-view" data-testid="budget-view">
      <h2 className="section-title">Budget Tracker</h2>
      <p>Total: ${total}</p>
      <p>Spent: ${spent}</p>
      <p>Remaining: ${remaining}</p>
      <button className="btn btn-primary" onClick={handleAddExpense}>Add Expense</button>
      <ul className="expenses-list">
        {expenses.map((exp) => (
          <li key={exp.id}>
            {exp.description}: ${exp.amount}
          </li>
        ))}
      </ul>
    </section>
  );
}
