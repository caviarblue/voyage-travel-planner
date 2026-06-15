"use client";
import { useState } from "react";
import { formatCurrency } from "../utils/currency";

const CATEGORIES = [
  { id: "transportation", label: "Transportation", icon: "🚌" },
  { id: "accommodation",  label: "Accommodation",  icon: "🏨" },
  { id: "attraction",     label: "Attraction",     icon: "🎡" },
  { id: "food",           label: "Food & Drinks",  icon: "🍜" },
  { id: "others",         label: "Others",         icon: "📦" },
];

const CAT_COLORS = {
  transportation: "hsl(210, 80%, 55%)",
  accommodation:  "hsl(270, 70%, 60%)",
  attraction:     "hsl(340, 75%, 58%)",
  food:           "hsl(30,  80%, 52%)",
  others:         "hsl(160, 55%, 48%)",
};

export default function BudgetView({ budget, setBudget, activeTrip, currency }) {
  const [activeCategory, setActiveCategory] = useState("transportation");
  const [newExpense, setNewExpense] = useState({ name: "", amount: "" });

  const baseline = budget.baseline || activeTrip?.baseBudget || 0;
  const expenses = budget.expenses || [];
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = baseline - totalSpent;
  const usedPct = baseline > 0 ? Math.min((totalSpent / baseline) * 100, 100) : 0;

  const categoryExpenses = expenses.filter((e) => e.category === activeCategory);
  const categoryTotal = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);

  const addExpense = () => {
    const amt = parseFloat(newExpense.amount);
    if (!newExpense.name.trim() || isNaN(amt) || amt <= 0) return;
    const expense = {
      id: Date.now(),
      name: newExpense.name.trim(),
      amount: amt,
      category: activeCategory,
    };
    setBudget({ ...budget, baseline, expenses: [...expenses, expense] });
    setNewExpense({ name: "", amount: "" });
  };

  const removeExpense = (id) => {
    setBudget({ ...budget, expenses: expenses.filter((e) => e.id !== id) });
  };

  const updateBaseline = (val) => {
    const num = parseFloat(val) || 0;
    setBudget({ ...budget, baseline: num });
  };

  return (
    <section className="budget-view">
      <h2 className="section-title">💰 Budget Tracker</h2>

      {/* ── Summary card ─────────────────────────────── */}
      <div className="budget-summary-card">
        <div className="budget-summary-row">
          <div className="budget-stat">
            <span className="budget-stat-label">Baseline Budget</span>
            <div className="budget-baseline-row">
              <span className="budget-stat-value baseline">
                {formatCurrency(baseline, currency)}
              </span>
              <button
                className="btn-edit-baseline"
                onClick={() => {
                  const val = window.prompt(`Set new baseline budget (${currency}):`, baseline);
                  if (val !== null) updateBaseline(val);
                }}
              >
                ✏️ Edit
              </button>
            </div>
          </div>
          <div className="budget-stat">
            <span className="budget-stat-label">Total Spent</span>
            <span className="budget-stat-value spent">
              {formatCurrency(totalSpent, currency)}
            </span>
          </div>
          <div className="budget-stat">
            <span className="budget-stat-label">Remaining</span>
            <span className={`budget-stat-value ${remaining < 0 ? "over" : "remaining"}`}>
              {remaining < 0 ? "−" : ""}{formatCurrency(Math.abs(remaining), currency)}
            </span>
          </div>
        </div>

        <div className="budget-progress-track">
          <div
            className="budget-progress-fill"
            style={{
              width: `${usedPct}%`,
              background: usedPct >= 100
                ? "hsl(0,70%,55%)"
                : usedPct >= 80
                ? "hsl(35,85%,52%)"
                : "var(--accent)",
            }}
          />
        </div>
        <div className="budget-progress-labels">
          <span>{usedPct.toFixed(1)}% used</span>
          <span>
            {remaining < 0
              ? `⚠️ Over budget by ${formatCurrency(Math.abs(remaining), currency)}`
              : `${formatCurrency(remaining, currency)} left`}
          </span>
        </div>
      </div>

      {/* ── Category overview mini cards ─────────────── */}
      <div className="category-overview">
        {CATEGORIES.map((cat) => {
          const total = expenses
            .filter((e) => e.category === cat.id)
            .reduce((sum, e) => sum + e.amount, 0);
          return (
            <div key={cat.id} className="category-mini-card" style={{ borderColor: CAT_COLORS[cat.id] }}>
              <span className="cat-mini-icon">{cat.icon}</span>
              <span className="cat-mini-label">{cat.label}</span>
              <span className="cat-mini-amount">{formatCurrency(total, currency)}</span>
            </div>
          );
        })}
      </div>

      {/* ── Category tabs ─────────────────────────────── */}
      <div className="category-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-tab ${activeCategory === cat.id ? "active" : ""}`}
            style={activeCategory === cat.id ? { borderColor: CAT_COLORS[cat.id], color: CAT_COLORS[cat.id] } : {}}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* ── Expense list for active category ─────────── */}
      <div className="category-content">
        <div className="category-content-header">
          <h3 className="category-title" style={{ color: CAT_COLORS[activeCategory] }}>
            {CATEGORIES.find((c) => c.id === activeCategory)?.icon}{" "}
            {CATEGORIES.find((c) => c.id === activeCategory)?.label}
          </h3>
          <span className="category-total">
            Total: {formatCurrency(categoryTotal, currency)}
          </span>
        </div>

        {categoryExpenses.length === 0 && (
          <p className="empty-state">No expenses in this category yet.</p>
        )}

        <ul className="expense-list">
          {categoryExpenses.map((e) => (
            <li key={e.id} className="expense-item">
              <span className="expense-name">{e.name}</span>
              <span className="expense-amount">{formatCurrency(e.amount, currency)}</span>
              <button className="remove-btn" onClick={() => removeExpense(e.id)}>✕</button>
            </li>
          ))}
        </ul>

        <div className="add-item">
          <input
            type="text"
            className="form-input"
            placeholder="Expense name"
            value={newExpense.name}
            onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && addExpense()}
            style={{ flex: 2 }}
          />
          <input
            type="number"
            className="form-input"
            placeholder={`Amount (${currency})`}
            min="0"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && addExpense()}
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary" onClick={addExpense}>+ Add</button>
        </div>
      </div>
    </section>
  );
}
