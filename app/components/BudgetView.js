import React, { useState } from "react";

export default function BudgetView({ budget, setBudget }) {
  const [newExpense, setNewExpense] = useState({ name: "", amount: "" });

  const addExpense = () => {
    if (!newExpense.name.trim() || isNaN(parseFloat(newExpense.amount))) return;
    const expense = {
      id: Date.now(),
      name: newExpense.name.trim(),
      amount: parseFloat(newExpense.amount),
    };
    const updatedExpenses = [...budget.expenses, expense];
    const updatedTotal = updatedExpenses.reduce((sum, e) => sum + e.amount, 0);
    setBudget({ total: updatedTotal, expenses: updatedExpenses });
    setNewExpense({ name: "", amount: "" });
  };

  const removeExpense = (id) => {
    const filtered = budget.expenses.filter((e) => e.id !== id);
    const total = filtered.reduce((sum, e) => sum + e.amount, 0);
    setBudget({ total, expenses: filtered });
  };

  return (
    <section className="budget-view">
      <h2 className="section-title">Budget Tracker</h2>
      <p>Total: ${budget.total?.toLocaleString() ?? 0}</p>
      <ul>
        {budget.expenses.map((e) => (
          <li key={e.id}>
            {e.name}: ${e.amount}
            <button className="btn btn-secondary" onClick={() => removeExpense(e.id)} style={{ marginLeft: "0.5rem" }}>
              ✕
            </button>
          </li>
        ))}
      </ul>
      <div className="add-item" style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Expense name"
          value={newExpense.name}
          onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
          className="btn btn-secondary"
          style={{ width: "30%", marginRight: "0.5rem" }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          className="btn btn-secondary"
          style={{ width: "20%", marginRight: "0.5rem" }}
        />
        <button className="btn btn-primary" onClick={addExpense}>
          Add
        </button>
      </div>
    </section>
  );
}
